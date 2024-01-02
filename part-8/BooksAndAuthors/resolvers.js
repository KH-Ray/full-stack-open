const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        const booksResult = await Book.find({
          author: author.id,
          genres: args.genre,
        }).populate("author");
        return booksResult;
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const foundBooks = await Book.find({ author: author }).populate(
          "author"
        );
        return foundBooks;
      }

      if (args.genre) {
        const genre = await Book.find({ genres: args.genre }).populate(
          "author"
        );
        return genre;
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root, args) => {
      const author = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: author });
      return foundBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      const authorFound = await Author.findOne({ name: args.author });
      let author;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (!authorFound) {
        try {
          author = new Author({ name: args.author, born: null });
          await author.save();
        } catch (error) {
          throw new GraphQLError("Saving person failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      } else {
        author = authorFound;
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      const authorFound = await Author.findOne({ name: args.name });

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (!authorFound) {
        return null;
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );

      return author.save();
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      try {
        await user.save();
      } catch (error) {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      }

      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator("BOOK_ADDED") },
  },
};

module.exports = resolvers;
