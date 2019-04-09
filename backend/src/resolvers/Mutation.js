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

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    const item = await ctx.db.query.item({ where }, `{id title}`);

    // TODO: Check if user has rights over the item.

    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
