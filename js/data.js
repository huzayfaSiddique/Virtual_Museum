/* ==========================================================================
   data.js — artwork dataset (shared by every page that renders artworks)
   Fields per plan §3: id, title, artist, year, era, medium, image, desc

   20 works from the Art Institute of Chicago's open-access collection.
   Every entry is public domain (is_public_domain = true); the image files in
   /images/artworks were downloaded from the museum's IIIF endpoint at 843px.
   ========================================================================== */
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
    id: "memling-virgin-and-child",
    title: "Virgin and Child",
    artist: "Hans Memling",
    year: "c. 1485",
    era: "Renaissance",
    medium: "Oil on panel",
    image: "images/artworks/renaissance-memling-virgin-and-child.jpg",
    desc: "An intensely polished Netherlandish panel: the Virgin sits in a dark interior so that her flesh tones and the brocade carry all the light."
  },
  {
    id: "botticelli-virgin-and-child-with-an-angel",
    title: "Virgin and Child with an Angel",
    artist: "Sandro Botticelli",
    year: "1475–85",
    era: "Renaissance",
    medium: "Tempera on panel",
    image: "images/artworks/renaissance-botticelli-virgin-and-child-with-an-angel.jpg",
    desc: "An early Botticelli in which the Virgin's downward gaze and the angel's direct look set up a quiet exchange between the earthly and the divine."
  },
  {
    id: "cranach-eve",
    title: "Eve",
    artist: "Lucas Cranach the Elder",
    year: "1533–37",
    era: "Renaissance",
    medium: "Oil on panel",
    image: "images/artworks/renaissance-cranach-eve.jpg",
    desc: "One half of a paired Adam and Eve, painted with the smooth pale flesh and exact foliage that Cranach's workshop supplied to German humanist patrons."
  },
  {
    id: "el-greco-assumption-of-the-virgin",
    title: "The Assumption of the Virgin",
    artist: "Domenico Theotokópoulos, called El Greco",
    year: "1577–79",
    era: "Renaissance",
    medium: "Oil on canvas",
    image: "images/artworks/renaissance-el-greco-assumption-of-the-virgin.jpg",
    desc: "The first major commission El Greco completed in Toledo, with the Virgin rising in a flame-like spiral above a crowd of apostles."
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
    id: "cassatt-the-childs-bath",
    title: "The Child's Bath",
    artist: "Mary Cassatt",
    year: "1893",
    era: "Impressionism",
    medium: "Oil on canvas",
    image: "images/artworks/impressionism-cassatt-the-childs-bath.jpg",
    desc: "An intimate overhead view of a woman bathing a child — a modern domestic subject that Cassatt flattened into the decorative pattern of Japanese prints."
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
    id: "rodin-the-walking-man",
    title: "The Walking Man",
    artist: "Auguste Rodin",
    year: "Modeled 1877–1900, cast before 1917",
    era: "Sculpture",
    medium: "Bronze",
    image: "images/artworks/sculpture-rodin-the-walking-man.jpg",
    desc: "A headless, armless body assembled from earlier studies so that the sculpture captures movement itself rather than any one figure."
  },
  {
    id: "carpeaux-ugolino-and-his-children",
    title: "Ugolino and his Children",
    artist: "Jean Baptiste Carpeaux",
    year: "1863–65",
    era: "Sculpture",
    medium: "Bronze",
    image: "images/artworks/sculpture-carpeaux-ugolino-and-his-children.jpg",
    desc: "After Dante's Inferno: the imprisoned Ugolino and his starving sons are rendered in twisting, muscular detail that shocked Carpeaux's contemporaries."
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
