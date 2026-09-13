const artworks = [
  {
    id: "fra-angelico-saint-anthony-abbot",
    title: "Saint Anthony Abbot",
    artist: "Fra Angelico",
    year: "1440–41",
    era: "Renaissance",
    medium: "Tempera on panel",
    image: "images/artworks/renaissance-fra-angelico-saint-anthony-abbot.jpg",
    desc: "A small devotional panel showing the desert saint with his staff and bell, painted for a predella and set against a plain gold ground."
  },
  {
    id: "van-der-weyden-portrait-of-jean-gros",
    title: "Portrait of Jean Gros",
    artist: "Rogier van der Weyden",
    year: "1460–64",
    era: "Renaissance",
    medium: "Oil on panel",
    image: "images/artworks/renaissance-van-der-weyden-portrait-of-jean-gros.jpg",
    desc: "A half-length portrait of a Burgundian court official, his hands joined in prayer and his gaze calm and level. It is one of van der Weyden's most searching late likenesses."
  },
  {
    id: "memling-portrait-of-a-donor",
    title: "Portrait of a Donor",
    artist: "Hans Memling",
    year: "c. 1485",
    era: "Renaissance",
    medium: "Oil on panel",
    image: "images/artworks/renaissance-memling-portrait-of-a-donor.jpg",
    desc: "A donor shown kneeling at prayer before an open book, framed by a painted window and a vase of carnations. The facing panel would once have carried the Virgin."
  },
  {
    id: "ghirlandaio-portrait-of-a-gentleman",
    title: "Portrait of a Gentleman",
    artist: "Ridolfo Ghirlandaio",
    year: "c. 1505",
    era: "Renaissance",
    medium: "Oil with tempera on panel, transferred to canvas",
    image: "images/artworks/renaissance-ghirlandaio-portrait-of-a-gentleman.jpg",
    desc: "A Florentine sitter in a black cap and fur-trimmed cloak, posed behind a parapet so that a small landscape is let into the picture at the left."
  },
  {
    id: "perugino-christ-and-the-woman-of-samaria",
    title: "Christ and the Woman of Samaria",
    artist: "Perugino",
    year: "1500–05",
    era: "Renaissance",
    medium: "Tempera on panel, transferred to canvas",
    image: "images/artworks/renaissance-perugino-christ-and-the-woman-of-samaria.jpg",
    desc: "Christ and the Samaritan woman meet across a stone well while other figures carry water through a calm, deep Umbrian landscape behind them."
  },
  {
    id: "caillebotte-paris-street-rainy-day",
    title: "Paris Street; Rainy Day",
    artist: "Gustave Caillebotte",
    year: "1877",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-caillebotte-paris-street-rainy-day.jpg",
    desc: "A wide, cool-toned view of a newly rebuilt Paris intersection, built on the sharp perspective that sets Caillebotte apart from his Impressionist friends."
  },
  {
    id: "monet-water-lilies",
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1906",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-monet-water-lilies.jpg",
    desc: "One of some 250 canvases Monet made of his pond at Giverny, dissolving the horizon so that water, sky and reflection share a single surface."
  },
  {
    id: "pissarro-the-crystal-palace",
    title: "The Crystal Palace",
    artist: "Camille Pissarro",
    year: "1871",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-pissarro-the-crystal-palace.jpg",
    desc: "Painted from a window in Sydenham, with the great glass halls of the Crystal Palace set far off behind a wide, wind-brushed sky."
  },
  {
    id: "seurat-la-grande-jatte",
    title: "A Sunday on La Grande Jatte — 1884",
    artist: "Georges Seurat",
    year: "1884–86, border added 1888–89",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-seurat-la-grande-jatte.jpg",
    desc: "Seurat's monumental riverside park, painted in small contrasting dots so that the colours blend optically when the canvas is seen from a distance."
  },
  {
    id: "van-gogh-the-bedroom",
    title: "The Bedroom",
    artist: "Vincent van Gogh",
    year: "1889",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-van-gogh-the-bedroom.jpg",
    desc: "Van Gogh's flattened, brightly coloured view of his room in the Yellow House at Arles, painted deliberately simply to suggest rest."
  },
  {
    id: "matisse-woman-before-an-aquarium",
    title: "Woman before an Aquarium",
    artist: "Henri Matisse",
    year: "1921–23",
    era: "Modern",
    medium: "Oil on canvas",
    image: "images/artworks/modern-matisse-woman-before-an-aquarium.jpg",
    desc: "A calm, decorative interior in which the seated figure and the goldfish bowl are treated as equal patches of pattern and colour."
  },
  {
    id: "kandinsky-improvisation-no-30",
    title: "Improvisation No. 30 (Cannons)",
    artist: "Vasily Kandinsky",
    year: "1913",
    era: "Modern",
    medium: "Oil on canvas",
    image: "images/artworks/modern-kandinsky-improvisation-no-30.jpg",
    desc: "A large free improvisation in which line and colour act almost independently of any subject — a decisive step toward pure abstraction."
  },
  {
    id: "modigliani-jacques-and-berthe-lipchitz",
    title: "Jacques and Berthe Lipchitz",
    artist: "Amedeo Modigliani",
    year: "1916",
    era: "Modern",
    medium: "Oil on canvas",
    image: "images/artworks/modern-modigliani-jacques-and-berthe-lipchitz.jpg",
    desc: "A double portrait of the sculptor Jacques Lipchitz and his wife, with the elongated noses and blank almond eyes that became Modigliani's signature."
  },
  {
    id: "mondrian-lozenge-composition",
    title: "Lozenge Composition with Yellow, Black, Blue, Red, and Gray",
    artist: "Piet Mondrian",
    year: "1921",
    era: "Modern",
    medium: "Oil on canvas",
    image: "images/artworks/modern-mondrian-lozenge-composition.jpg",
    desc: "A diamond-oriented canvas of black grid and primary blocks, testing how far Mondrian's Neo-Plasticism could be pushed."
  },
  {
    id: "munch-the-girl-by-the-window",
    title: "The Girl by the Window",
    artist: "Edvard Munch",
    year: "1893",
    era: "Modern",
    medium: "Oil on canvas",
    image: "images/artworks/modern-munch-the-girl-by-the-window.jpg",
    desc: "A late-night interior painted from memory, with the figure turned away from us while the window light picks out the room."
  },
  {
    id: "french-abraham-lincoln",
    title: "Abraham Lincoln",
    artist: "Daniel Chester French",
    year: "Modeled 1912, cast after 1912",
    era: "Sculpture",
    medium: "Bronze",
    image: "images/artworks/sculpture-french-abraham-lincoln.jpg",
    desc: "A standing bronze of the president with his hands clasped and his head bowed. French's studies for this monument also led to the seated Lincoln in Washington."
  },
  {
    id: "saint-gaudens-the-puritan",
    title: "The Puritan",
    artist: "Augustus Saint-Gaudens",
    year: "Modeled 1883–86, cast after 1899",
    era: "Sculpture",
    medium: "Bronze",
    image: "images/artworks/sculpture-saint-gaudens-the-puritan.jpg",
    desc: "A striding figure in a tall hat and swirling cloak, carrying a book and a staff, modelled for a monument at Springfield, Massachusetts."
  },
  {
    id: "barye-lion-fighting-a-serpent",
    title: "Lion Fighting a Serpent",
    artist: "Antoine Louis Barye",
    year: "1847–55",
    era: "Sculpture",
    medium: "Bronze",
    image: "images/artworks/sculpture-barye-lion-fighting-a-serpent.jpg",
    desc: "Barye built his reputation on animal subjects; here a lion and a snake lock together into a compact, violent knot of bronze."
  },
  {
    id: "houdon-portrait-of-turgot",
    title: "Portrait of Anne Robert Turgot, Baron of Laulne",
    artist: "Jean Antoine Houdon",
    year: "1778",
    era: "Sculpture",
    medium: "Patinated plaster",
    image: "images/artworks/sculpture-houdon-portrait-of-turgot.jpg",
    desc: "A portrait bust of the French economist and statesman, modelled from life and prized for its plain, naturalistic surfaces."
  },
  {
    id: "canova-bust-of-paris",
    title: "Bust of Paris",
    artist: "Antonio Canova",
    year: "1809",
    era: "Sculpture",
    medium: "Marble",
    image: "images/artworks/sculpture-canova-bust-of-paris.jpg",
    desc: "An idealised marble head of the Trojan prince Paris, embodying the cool Neoclassical manner that followed the Baroque."
  }
];
