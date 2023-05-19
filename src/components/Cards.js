import CardRow from "./CardRow";

const Cards = (props) => {
  return (
    <div className="cards">
      {Object.keys(props.exercises).map(suit => {
        var e = props.exercises[suit];
        var key = 'card-' + suit;
        return <CardRow key={key} suit={suit} exercise={e} edit={props.edit} />
      })}
    </div>
  )
}

export default Cards