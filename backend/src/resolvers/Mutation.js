const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check to see if user is logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // Firstly, make a copy
    const updates = { ...args };
    // Remove id from the updates object
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
