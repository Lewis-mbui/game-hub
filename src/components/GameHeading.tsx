import type { GameQuery } from "@/App";
import { Heading } from "@chakra-ui/react";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  // Games
  // Action Games
  // Xbox Games
  // Xbox Action Games
  const heading = `${gameQuery.platform?.name || ""} ${
    gameQuery.genre?.name || ""
  } Games`;

  return (
    <Heading marginY={5} fontSize={"5xl"} as={"h1"}>
      {heading}
    </Heading>
  );
};

export default GameHeading;
