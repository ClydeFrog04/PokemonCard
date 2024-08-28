export type PokemonT = {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: Ability[]
    forms: Form[]
    game_indices: Index[]
    held_items: HeldItem[]
    location_area_encounters: string
    moves: Mfe[]
    species: Species
    sprites: Sprites
    cries: Cries
    stats: Stat[]
    types: Type[]
    past_types: PastType[]
}

export interface Ability {
    is_hidden: boolean
    slot: number
    ability: Ability2
}

export interface Ability2 {
    name: string
    url: string
}

export interface Form {
    name: string
    url: string
}

export interface Index {
    game_index: number
    version: Version
}

export interface Version {
    name: string
    url: string
}

export interface HeldItem {
    item: Item
    version_details: VersionDetail[]
}

export interface Item {
    name: string
    url: string
}

export interface VersionDetail {
    rarity: number
    version: Version2
}

export interface Version2 {
    name: string
    url: string
}

export interface Mfe {
    move: Move
    version_group_details: VersionGroupDetail[]
}

export interface Move {
    name: string
    url: string
}

export interface VersionGroupDetail {
    level_learned_at: number
    version_group: VersionGroup
    move_learn_method: MoveLearnMethod
}

export interface VersionGroup {
    name: string
    url: string
}

export interface MoveLearnMethod {
    name: string
    url: string
}

export interface Species {
    name: string
    url: string
}

export interface Sprites {
    [index: string]: any;
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: Other
    versions: Versions
}

export interface Other {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
    showdown: Showdown
}

export interface DreamWorld {
    front_default: string
    front_female: any
}

export interface Home {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface OfficialArtwork {
    front_default: string
    front_shiny: string
}

export interface Showdown {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface Versions {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
}

export interface GenerationI {
    "red-blue": RedBlue
    yellow: Yellow
}

export interface RedBlue {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
}

export interface Yellow {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
}

export interface GenerationIi {
    crystal: Crystal
    gold: Gold
    silver: Silver
}

export interface Crystal {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export interface Gold {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export interface Silver {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export interface GenerationIii {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
}

export interface Emerald {
    front_default: string
    front_shiny: string
}

export interface FireredLeafgreen {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export interface RubySapphire {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export interface GenerationIv {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
}

export interface DiamondPearl {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface HeartgoldSoulsilver {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface Platinum {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface GenerationV {
    "black-white": BlackWhite
}

export interface BlackWhite {
    animated: Animated
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface Animated {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
}

export interface OmegarubyAlphasapphire {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface XY {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface GenerationVii {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export interface Icons {
    front_default: string
    front_female: any
}

export interface UltraSunUltraMoon {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export interface GenerationViii {
    icons: Icons2
}

export interface Icons2 {
    front_default: string
    front_female: any
}

export interface Cries {
    latest: string
    legacy: string
}

export interface Stat {
    base_stat: number
    effort: number
    stat: Stat2
}

export interface Stat2 {
    name: string
    url: string
}

export interface Type {
    slot: number
    type: Type2
}

export interface Type2 {
    name: string
    url: string
}

export interface PastType {
    generation: Generation
    types: Type3[]
}

export interface Generation {
    name: string
    url: string
}

export interface Type3 {
    slot: number
    type: Type4
}

export interface Type4 {
    name: string
    url: string
}

export const TypeColors: {[index: string]: string} = {
    normal: "rgb(84, 84, 54)",
    fire: "rgb(172, 79, 12)",
    water: "rgb(14, 50, 137)",
    electric: "rgb(130, 105, 4)",
    grass: "rgb(95, 144, 45)",
    ice: "rgb(37, 99, 99)",
    fighting: "rgb(154, 38, 32)",
    poison: "rgb(128, 51, 128)",
    ground: "rgb(100, 79, 20)",
    flying: "rgb(39, 15, 112)",
    psychic: "rgb(149, 6, 49)",
    bug: "rgb(134, 147, 26)",
    rock: "rgb(147, 128, 45)",
    ghost: "rgb(90, 70, 122)",
    dragon: "rgb(53, 6, 169)",
    dark: "rgb(90, 70, 58)",
    steel: "rgb(49, 49, 73)",
    fairy: "rgb(86, 18, 25)",
}

// export const TypeColors: {[index: string]: string} = {
//     normal: "rgb(84, 84, 54)",
//     fire: "rgb(172, 79, 12)",
//     water: "rgb(14, 50, 137)",
//     electric: "rgb(130, 105, 4)",
//     grass: "rgb(95, 144, 45)",
//     ice: "rgb(37, 99, 99)",
//     fighting: "rgb(154, 38, 32)",
//     poison: "rgb(128, 51, 128)",
//     ground: "rgb(100, 79, 20)",
//     flying: "rgb(39, 15, 112)",
//     psychic: "rgb(149, 6, 49)",
//     bug: "rgb(134, 147, 26)",
//     rock: "rgb(147, 128, 45)",
//     ghost: "rgb(90, 70, 122)",
//     dragon: "rgb(53, 6, 169)",
//     dark: "rgb(90, 70, 58)",
//     steel: "rgb(49, 49, 73)",
//     fairy: "rgb(86, 18, 25)",
// }