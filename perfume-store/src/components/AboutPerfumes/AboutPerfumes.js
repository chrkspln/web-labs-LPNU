import React from 'react';
import './AboutPerfumes.css';
import AboutPerfumesCard from './AboutPerfumesCard';

const AboutPerfumes = () => {
  const cardData = [
    {
      title: 'Suu...',
      text: 'Masaki Matsushima\'s Suu... like a breath of fresh air, it transcends you to a zen state of mind. ' +
          'The fragrance begins with an energetic burst of exotic, juicy fruits, creating a lively opening. ' +
          'As it evolves, the heart of the perfume unfolds into a delicate breath of extremely feminine flowers. '
    },
    {
      title: 'Mat.',
      text: 'Masaki Matsushima\'s Mat. encapsulates the perfect reflection of a post-modern style, transcending time. ' +
          'The top note boasts an inventive blend, marrying the wisdom of ancestral Bamboo’s green aquatic freshness ' +
          'with the impertinent explosion of Mango pulp, inspiring further exploration into the world of “mat;”. '
    },
    {
      title: 'Marry Me!',
      text: 'Lanvin\'s Marry Me! is a floral and fruity fragrance, with a blend of ' +
          'sweet and fresh notes. A fresh and optimistic affirmation of a joyful state of mind. ' +
          'An elixir of true love combining sensual jasmine with the vivacity of bitter orange.'
    },
    {
      title: 'Parfum d\'Ete',
      text: 'Kenzo\'s Parfum d\'Ete. A pure, simple and limpid bottle in the shape of a leaf holds ' +
          'a green floral fragrance in which crisp Lily of the Valley Leaf announces a heart of Peony, ' +
          'Jasmine and Hyacinth over a delicate Sandalwood base. A trail infused with nature. '
    },
    {
      title: 'Noa',
      text: 'Cacharel\'s Noa is a small planet in your hand with a pearl inside. ' +
          'This fragrance is like a tender whisper, feminine and subtle, weightless, but with a noticeable presence. ' +
          'Tender powdery top notes of freesia, peach skin, peony, and musk lead to a floral heart of white flowers, ' +
          'ylang-ylang, and rose. The base is woodsy and transparent with coffee and incense touches. '
    },
    {
      title: 'Equus Pour Homme',
      text: 'Lalique\'s Equus Pour Homme plays with the freshness and masculinity of noble spices coupled ' +
          'with the subtle sparkle of citrus and woody notes. After the fresh blend of noble Spices and subtle ' +
          'sparkle of Citrus, come the notes belonging to a resolutely masculine fragrance combining the refinement ' +
          'of Precious Woods with the sensuality of a potent base with Leathery and Musky qualities. '
    },
    {
      title: 'Terre d\'Hermès',
      text: 'A mineral, woody fragrance, Terre d\'Hermès combines the strength of cedar and the radiance of ' +
          'grapefruit with a vibrant touch of flint. At its base, the bottle rests on an orange H, leaving its ' +
          'imprint on the earth. At the top, the light is reflected by metal shoulders. '
    },
    {
      title: 'Armani Code',
      text: 'Armani Code Parfum rewrites the code of a timeless masculine fragrance, infusing the powerful and seductive signature ' +
          'Tonka Bean with fresh notes of iris, sage, and bergamot, to create a woody aromatic blend that is ' +
          'long-lasting and uniquely distinctive.'
    },
  ];

  return (
      <div className="about-us">
        <h2><span className="underline-light_blue">A quick glance on our best-sellers</span></h2>
        <div className="about-us__container_wrapper">
          {cardData.map((card, index) => (
              <AboutPerfumesCard key={index} title={card.title} text={card.text}/>
          ))}
        </div>
        <button className="view-more-btn">View more</button>
      </div>
  );
};

export default AboutPerfumes;
