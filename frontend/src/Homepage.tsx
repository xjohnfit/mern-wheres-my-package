import ColourfulText from "./components/ui/colourful-text";

const Homepage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white">
        <ColourfulText text="Track all your packages effortlessly" />
      </h1>
    </div>
  )
}
export default Homepage