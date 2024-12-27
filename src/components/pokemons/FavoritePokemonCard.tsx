import type { FavoritePokemon } from "@interfaces/favorite-pokemon";
import { createSignal, Show, type Component } from "solid-js";

interface Props {
  pokemon: FavoritePokemon;
}

// Esto no es reactivo ya que no existe el createSignal
export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {
  const [isVisible, setIsVisible] = createSignal(true);
  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavorite = () => {
    const favoritePokemons = JSON.parse(
      localStorage.getItem("favorites") ?? "[]"
    ) as FavoritePokemon[];

    const newFavorites = favoritePokemons.filter(
      (p: FavoritePokemon) => p.id !== pokemon.id
    );
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsVisible(false);
  };

  return (
    <Show when={isVisible()}>
      <div class="flex flex-col justify-center items-center">
        <a href={`/pokemons/${pokemon.name}`}>
          <img src={imageSrc} alt={pokemon.name} class="w-24 h-24" style={`view-transition-name: ${pokemon.name}-image`} />
          <p class="capitalize">
            #{pokemon.id} - {pokemon.name}
          </p>
        </a>
        <button onClick={deleteFavorite} class="text-red-400">Borrar</button>
      </div>
    </Show>
  );
};
