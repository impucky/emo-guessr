const LoadingDots = () => (
  <div className="text-center">
    {["🎮", "🎮", "🎮"].map((dot, i) => {
      return (
        <span
          key={i}
          style={{
            animation: `loading 0.9s infinite alternate linear`,
            animationDelay: `${i * 300}ms`,
          }}
        >
          {dot}
        </span>
      );
    })}
  </div>
);

export default LoadingDots;
