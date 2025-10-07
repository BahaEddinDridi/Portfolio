import React from 'react';

const ShootingStars = () => {
  return (
    <>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .star {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
          animation: animate 5s linear infinite;
        }
        .star::before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 300px;
          height: 1px;
          background: linear-gradient(90deg, #fff, transparent);
        }
        @keyframes animate {
          0% {
            transform: rotate(315deg) translateX(0);
            opacity: 1;
          }
          28% {
            opacity: 1;
          }
          40% {
            transform: rotate(315deg) translateX(-1500px);
            opacity: 0;
          }
          100% {
            transform: rotate(315deg) translateX(-1500px);
            opacity: 0;
          }
        }
      `}</style>
      <div className="container">
        <span
          className="star"
          style={{
            top: 0,
            right: 0,
            left: 'initial',
            animationDelay: '0s',
          }}
        ></span>
        <span
          className="star"
          style={{
            top: 0,
            right: '180px',
            left: 'initial',
            animationDelay: '0.3s',
          }}
        ></span>
        <span
          className="star"
          style={{
            top: 0,
            right: '600px',
            left: 'initial',
            animationDelay: '0.6s',
          }}
        ></span>
      </div>
    </>
  );
};

export default ShootingStars;