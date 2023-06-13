import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <p>&copy; 2023 - CryptoHub</p>
    </footer>
  );
}

export default Footer;