const STUDY_CONTENT = {
    chapters: [
        {
            id: 1,
            title: "Chapter 1: Principles of Ecology",
            description: "Ecology, biotic & abiotic factors, levels of organization, and symbiosis.",
            notes: [
                {
                    heading: "What is Ecology?",
                    content: "Ecology is the scientific discipline in which relationships among living organisms and the interactions the organisms have with their environments are studied. Introduced in 1866 by Ernst Haeckel.",
                    definitions: ["Ecology: The study of interactions among organisms and their environments."]
                },
                {
                    heading: "Biotic and Abiotic Factors",
                    content: "The biosphere's diverse locations contain organisms adapted to their environment, divided into living and nonliving factors.",
                    definitions: [
                        "Biotic factors: The living factors in an organism's environment (e.g., plants, animals, bacteria, fungi).",
                        "Abiotic factors: The nonliving factors in an organism's environment (e.g., temperature, sunlight, soil, rainfall, air currents)."
                    ]
                },
                {
                    heading: "Range of Tolerance & Limiting Factors",
                    content: "Any abiotic or biotic factor that restricts numbers, reproduction, or distribution of organisms is a limiting factor (e.g., water in a desert, temperature for trout).",
                    definitions: ["Tolerance: The ability of an organism to survive when subjected to abiotic or biotic factors."]
                },
                {
                    heading: "Levels of Ecological Organization",
                    content: "Ecologists study smaller pieces of the biosphere increasing in complexity:",
                    facts: [
                        "1. Organism: An individual living thing.",
                        "2. Population: Organisms of a single species in the same location at the same time.",
                        "3. Biological Community: Interacting populations occupying the same area.",
                        "4. Ecosystem: Biological community and all abiotic factors affecting it.",
                        "5. Biome: Large group of ecosystems sharing the same climate.",
                        "6. Biosphere: The highest level, the portion of Earth supporting life."
                    ]
                },
                {
                    heading: "Community Interactions & Symbiosis",
                    content: "Organisms interact constantly through competition, predation, and symbiosis.",
                    definitions: [
                        "Mutualism: Both species benefit (e.g., algae and sloth fur, lichens).",
                        "Commensalism: One organism benefits, the other is unaffected (e.g., clownfish and sea anemone).",
                        "Parasitism: One organism benefits at the expense of another (e.g., ticks, tapeworms, parasitic wasps)."
                    ]
                }
            ]
        },
        {
            id: 2,
            title: "Chapter 2: Flow of Energy in an Ecosystem",
            description: "Autotrophs, heterotrophs, food chains, food webs, and ecological pyramids.",
            notes: [
                {
                    heading: "Autotrophs and Heterotrophs",
                    content: "Energy flow begins with primary producers and moves through consumers.",
                    definitions: [
                        "Autotroph (Producer): Collects energy from sunlight or inorganic substances to produce food (plants, algae).",
                        "Heterotroph (Consumer): Gets energy by consuming other organisms (herbivores, carnivores, omnivores, detritivores, decomposers)."
                    ]
                },
                {
                    heading: "Models of Energy Flow",
                    content: "Ecologists use food chains, food webs, and ecological pyramids to model energy flow.",
                    facts: [
                        "Food Chain: A simplified model showing how energy flows from autotroph to heterotroph.",
                        "Food Web: A model representing many interconnected food chains in an ecosystem.",
                        "Trophic Level: Each step in a food chain or food web. Autotrophs make up the first level."
                    ]
                },
                {
                    heading: "Ecological Pyramids & The 10% Rule",
                    content: "In a pyramid of energy, only 10 percent of all energy is transferred to the level above it because most is consumed by cellular processes or released as heat."
                }
            ]
        },
        {
            id: 3,
            title: "Chapter 3: Cycling of Matter",
            description: "Biogeochemical cycles including water, carbon/oxygen, nitrogen, and phosphorus.",
            notes: [
                {
                    heading: "Biogeochemical Cycles",
                    content: "Matter is not created or destroyed (Law of Conservation of Mass). Nutrients cycle through living organisms (bio), geological processes (geo), and chemical processes.",
                    definitions: ["Biogeochemical cycle: The exchange of matter through the biosphere."]
                },
                {
                    heading: "The Water Cycle",
                    content: "Driven by solar energy: Evaporation (90% from oceans/lakes, 10% transpiration from plants) -> Condensation -> Precipitation -> Percolation & Runoff."
                },
                {
                    heading: "Carbon, Nitrogen, & Phosphorus Cycles",
                    content: "Carbon and oxygen cycle via photosynthesis and cellular respiration. Nitrogen gas in the atmosphere undergoes nitrogen fixation by bacteria into ammonium (NH4+) and nitrates for plants. Phosphorus cycles through soil, producers, consumers, and long-term rock sedimentation."
                }
            ]
        },
        {
            id: 4,
            title: "Chapter 4: Population Dynamics",
            description: "Population characteristics, growth models, carrying capacity, and demography.",
            notes: [
                {
                    heading: "Population Characteristics",
                    content: "Populations have density, spatial distribution (uniform, clumped, random dispersion), and growth rates.",
                    definitions: ["Carrying capacity: The maximum number of individuals in a species that an environment can support long-term."]
                },
                {
                    heading: "Limiting Factors & Growth Models",
                    content: "Factors can be density-independent (weather, fires) or density-dependent (disease, competition, predation). Exponential growth creates a J-curve; logistic growth creates an S-curve leveling off at carrying capacity.",
                    definitions: [
                        "r-strategist: Small organism, short lifespan, produces many offspring (e.g., locusts, mice).",
                        "k-strategist: Large organism, long lifespan, produces few offspring with high parental care (e.g., elephants)."
                    ]
                }
            ]
        },
        {
            id: 5,
            title: "Chapter 5: Biodiversity and Conservation",
            description: "Genetic, species, and ecosystem diversity, threats to biodiversity, and sustainable use.",
            notes: [
                {
                    heading: "Biodiversity & Its Value",
                    content: "Biodiversity is the variety of life in an area, comprising genetic diversity, species diversity, and ecosystem diversity. It provides direct economic value (crops, medicines like aspirin and periwinkle extract) and indirect economic value (clean water, watersheds).",
                    definitions: ["Extinction: The permanent disappearance of a species when the last member dies."]
                },
                {
                    heading: "Threats to Biodiversity",
                    content: "Primary anthropogenic threats include habitat loss (number one cause), habitat fragmentation, overexploitation (e.g., overhunting bison, mahogany logging), invasive species (lacking natural predators), pollution (biological magnification of DDT), and climate change."
                }
            ]
        }
    ],
    quizzes: [
        {
            id: 1,
            chapterId: 1,
            title: "Chapter 1 Quiz: Principles of Ecology",
            questions: [
                {
                    q: "What scientific term describes the study of interactions among organisms and their environments?",
                    options: ["Biology", "Ecology", "Geology", "Zoology"],
                    answer: 1,
                    explanation: "Ecology is the scientific discipline in which relationships among living organisms and their environments are studied (introduced by Ernst Haeckel in 1866)."
                },
                {
                    q: "Which of the following is an example of an abiotic factor?",
                    options: ["Algae", "Bacteria", "Air temperature", "Grasshopper"],
                    answer: 2,
                    explanation: "Abiotic factors are nonliving components in an environment, such as temperature, sunlight, and soil."
                },
                {
                    q: "In which symbiotic relationship do both organisms benefit?",
                    options: ["Parasitism", "Commensalism", "Mutualism", "Predation"],
                    answer: 2,
                    explanation: "Mutualism is a close relationship where two or more species live closely together and benefit from each other (e.g., algae in sloth fur)."
                }
            ]
        },
        {
            id: 2,
            chapterId: 2,
            title: "Chapter 2 Quiz: Flow of Energy",
            questions: [
                {
                    q: "What percentage of energy is typically transferred from one trophic level to the level immediately above it?",
                    options: ["1%", "10%", "50%", "100%"],
                    answer: 1,
                    explanation: "Only 10 percent of all energy is transferred because most energy is consumed by cellular processes or released as heat."
                },
                {
                    q: "Organisms that make their own food using sunlight or inorganic substances are called:",
                    options: ["Heterotrophs", "Autotrophs", "Carnivores", "Detritivores"],
                    answer: 1,
                    explanation: "Autotrophs (primary producers) collect energy from sunlight or inorganic substances to produce food."
                }
            ]
        },
        {
            id: 3,
            chapterId: 3,
            title: "Chapter 3 Quiz: Cycling of Matter",
            questions: [
                {
                    q: "Approximately what percentage of water on Earth is freshwater?",
                    options: ["2.5%", "50%", "97.5%", "10%"],
                    answer: 0,
                    explanation: "Only about 2.5% of water on Earth is freshwater, and most of that is locked in glaciers."
                },
                {
                    q: "What process converts nitrogen gas (N2) in the atmosphere into ammonium (NH4+) for plants?",
                    options: ["Nitrification", "Nitrogen fixation", "Transpiration", "Denitrification"],
                    answer: 1,
                    explanation: "Specialized bacteria and microorganisms perform nitrogen fixation to convert N2 into usable ammonium."
                }
            ]
        },
        {
            id: 4,
            chapterId: 4,
            title: "Chapter 4 Quiz: Population Dynamics",
            questions: [
                {
                    q: "What type of population growth curve is J-shaped and occurs when resources are unlimited?",
                    options: ["Logistic growth", "Exponential growth", "Linear growth", "Inverse growth"],
                    answer: 1,
                    explanation: "Exponential growth (geometric growth) occurs when growth rate is proportional to population size, forming a J-curve."
                },
                {
                    q: "Elephants, which produce few offspring and invest heavy care in raising them, are classified as:",
                    options: ["r-strategists", "k-strategists", "Autotrophs", "Detritivores"],
                    answer: 1,
                    explanation: "k-strategists are larger organisms with long lifespans that produce few offspring near the carrying capacity."
                }
            ]
        },
        {
            id: 5,
            chapterId: 5,
            title: "Chapter 5 Quiz: Biodiversity & Conservation",
            questions: [
                {
                    q: "What is currently considered the number one cause of species extinction today?",
                    options: ["Overexploitation", "Destruction of habitat", "Volcanic eruptions", "Introduction of cold weather"],
                    answer: 1,
                    explanation: "While overexploitation was historically a major cause, the destruction and loss of habitat is the number one cause of extinction today."
                },
                {
                    q: "The increasing concentration of toxic substances (like DDT) in organisms at higher trophic levels is called:",
                    options: ["Eutrophication", "Biological magnification", "Habitat fragmentation", "Demographic transition"],
                    answer: 1,
                    explanation: "Biological magnification is the increasing concentration of toxic substances in organisms as trophic levels increase."
                }
            ]
        }
    ],
    flashcards: [
        { term: "Ecology", definition: "The scientific study of relationships among living organisms and their interactions with the environment." },
        { term: "Biotic Factor", definition: "The living factors in an organism's environment." },
        { term: "Abiotic Factor", definition: "The nonliving factors in an organism's environment (e.g., temperature, soil, sunlight)." },
        { term: "Limiting Factor", definition: "Any abiotic or biotic factor that restricts the numbers, reproduction, or distribution of organisms." },
        { term: "Mutualism", definition: "A symbiotic relationship where two or more species live closely together and both benefit." },
        { term: "Autotroph", definition: "An organism that collects energy from sunlight or inorganic substances to produce its own food (primary producer)." },
        { term: "Heterotroph", definition: "An organism that gets its energy requirements by consuming other organisms (consumer)." },
        { term: "Trophic Level", definition: "Each step in a food chain or food web." },
        { term: "Biogeochemical Cycle", definition: "The exchange of matter through the biosphere involving living, geological, and chemical processes." },
        { term: "Carrying Capacity", definition: "The maximum number of individuals in a species that an environment can support long-term." },
        { term: "r-strategist", definition: "An organism adapted to fluctuating environments; small size, short lifespan, produces many offspring." },
        { term: "k-strategist", definition: "An organism adapted to stable environments; large size, long lifespan, produces few offspring with high parental care." },
        { term: "Biodiversity", definition: "The variety of life in an area, determined by the number of different species." },
        { term: "Biological Magnification", definition: "The increasing concentration of toxic substances in organisms at higher trophic levels in a food web." },
        { term: "Sustainable Use", definition: "Using resources at a rate in which they can be replaced or recycled while preserving long-term environmental health." }
    ]
};
