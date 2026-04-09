import logo from "./logo.png";

const Logo = ({ compact = false }) => (
  <div className="flex items-center">
    <img
      src={logo}
      alt="Special Miles logo"
      className={
        compact ? "h-12 w-auto object-contain" : "h-20 w-auto object-contain"
      }
    />
  </div>
);

export default Logo;
