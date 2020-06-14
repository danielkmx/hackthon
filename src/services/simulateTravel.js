const simulateTravel = (steps, kilometrosParaAndar) => {
  if (
    steps[0].distance.value > kilometrosParaAndar ||
    kilometrosParaAndar - steps[0].distance < 0 ||
    kilometrosParaAndar - steps[0].distance === 0
  )
    return steps[0];
  console.log(steps[0].distance);
  console.log(kilometrosParaAndar);
  const tempArray = [...steps];
  const kilometrosAtualizados = kilometrosParaAndar - steps[0].distance.value;
  tempArray.shift();
  return simulateTravel(tempArray, kilometrosAtualizados);
};

export default simulateTravel;
