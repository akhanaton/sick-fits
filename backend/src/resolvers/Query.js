const Query = {
  dogs(parent, args, ctx, info) {
    return [
      { name: 'Bingo', age: 7 },
      { name: 'Tiger', age: 2 },
      { name: 'Leo', age: 10 },
    ];
  },
};

module.exports = Query;
