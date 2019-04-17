const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  item: forwardTo('db'),
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) return null;
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('You must be logged in');
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) throw new Error('You must be logged in');

    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );

    const ownsOrder = order.user.id === ctx.request.userId;
    const hasRightsToSeeOrder = ctx.request.user.permissions.includes('ADMIN');

    if (!ownsOrder || !hasRightsToSeeOrder)
      throw new Error("You can't see this order");

    return order;
  },
  /**
    async items(parent, args, ctx, info) {
      const items = await ctx.db.query.items();
  
      return items;
    },
  */
};

module.exports = Query;
