import useStore from "../store"

const S = () => {
  const { dishName, setDishName } = useStore()

  return (
    <p style={{ marginBottom: "40px", textAlign: "center" }}>⚡ {dishName} ⚡</p>
  )
}

export default S
