import Link from 'next/link';
import React from 'react';

const Nav = () => (
  <div>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/">
      <a>Home</a>
    </Link>
  </div>
);

export default Nav;
