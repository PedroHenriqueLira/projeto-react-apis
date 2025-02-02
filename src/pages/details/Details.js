import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MainContainer } from "../../components/main/style";
import NavBar from "../../components/navbar/NavBar";
import { GlobalContext } from "../../context/GlobalContext";
import {
  ContainerImagens,
  DetailContainer,
  Titulo,
  Imagem,
  BaseContainer,
  TituloStats,
  MovesContainer,
  Moves,
  ContainerInfos,
  Type,
  ContainerTypes,
  PokeImg
} from "./detailsStyle";
import { Box, Text, Stack, SimpleGrid } from "@chakra-ui/react";
import { getPokemonType } from "../../constantes/types";
import { getPokemonColors } from "../../constantes/colors";
import { BasicUsageAdd } from "../../constantes/modal";

const Details = () => {
  const context = useContext(GlobalContext);
  const { pokemons, isOpen } = context;
  const { name } = useParams();

  const pokeDetalhes = pokemons.find(
    (pokemon) => pokemon.name === name.toLowerCase()
  );

  const somaStatus = pokeDetalhes
    ? pokeDetalhes.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
    : 0;

  return (
    <>
      <NavBar />
      <MainContainer>
        <Titulo>Detalhes</Titulo>
        {isOpen && <BasicUsageAdd />}
        <DetailContainer
          color={getPokemonColors(pokeDetalhes?.types[0]?.type?.name)}
        >
          <ContainerImagens>
            <Imagem src={pokeDetalhes?.sprites?.front_default} />
            <Imagem src={pokeDetalhes?.sprites?.back_default} />
          </ContainerImagens>

          <BaseContainer>
            <Box px={4} py={4}>
              <TituloStats fontWeight="bold">Base Stats</TituloStats>
              <br></br>
              <Stack>
                {pokeDetalhes?.stats.map((stat, index) => (
                  <SimpleGrid columns={3} key={index}>               
                    <Text style={{ fontWeight: 'bold' }}>{
                    stat.stat.name.startsWith('hp') ? 'HP' :
                    stat.stat.name.startsWith('attack') ? 'Attack' :
                    stat.stat.name.startsWith('defense') ? 'Defense' :
                    stat.stat.name.startsWith('special-attack') ? 'SP-Attack' :
                    stat.stat.name.startsWith('special-defense') ? 'SP-Defense' :
                    stat.stat.name.startsWith('speed') ? 'Speed' :
                    stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)
                    }</Text>
                    <Text>{stat.base_stat}</Text>
                    <Box
                      height="10px"
                      width="100%"
                      mt={2}
                      bg="gray.300"
                      borderRadius="25px"
                      position="relative"
                    >
                      <Box
                        position="absolute"
                        width={`${(stat.base_stat) * 1}%`}
                        height="100%"
                        bg={`hsl(${(stat.base_stat / 150) * 100}, 80%, 50%)`}
                        borderRadius="25px"                                               
                      />
                    </Box>
                  </SimpleGrid>
                ))}
                <br></br>
                <SimpleGrid columns={2}>
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold">{somaStatus}</Text>
                </SimpleGrid>
              </Stack>
            </Box>
          </BaseContainer>

          <ContainerInfos>
          <h2>#{pokeDetalhes?.id < 10 ? '0' + pokeDetalhes?.id : pokeDetalhes?.id}</h2>
            <h1>{pokeDetalhes?.name ? pokeDetalhes?.name.charAt(0).toUpperCase() + pokeDetalhes?.name.slice(1).toLowerCase() : ''}</h1>
            <ContainerTypes>
              {pokeDetalhes?.types.map((type, index) => (
                <Type key={index} src={getPokemonType(type.type.name)} />
              ))}
            </ContainerTypes>

            <MovesContainer>
              <TituloStats> Moves:</TituloStats>
              {pokeDetalhes?.moves.slice(0, 4).map((move, index) => (
                <Moves key={index}>{move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1).toLowerCase()}</Moves>
              ))}
            </MovesContainer>
          </ContainerInfos>

          <PokeImg
            src={
              pokeDetalhes?.sprites?.other?.["official-artwork"]?.front_default
            }
          />
        </DetailContainer>
      </MainContainer>
    </>
  );
};

export default Details;
