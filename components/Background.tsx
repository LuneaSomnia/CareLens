import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a1b3e_0%,_#0B1026_60%,_#000000_100%)]"></div>
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `
            url('https://drive.google.com/thumbnail?id=1j3ci8RB2ohTTa7gh6amtmjA3DODS9EIk&sz=w2560'),
            url('background.png'),
            url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.6)'
        }}
      />
    </div>
  );
};

export default Background;
