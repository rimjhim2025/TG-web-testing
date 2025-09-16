// TODO:: WIP
export const getBrandFromSlug = (slug, brands) => {
  console.log('Slug:', slug);

  if (!slug) return null;
  const parts = slug.split('-');

  console.log('Parts:', parts);

  if (parts.length > 0) {
    const brand = brands.filter(brand => {
      return (
        brand.name.includes(parts[0]) ||
        brand.name.toLowerCase().includes(parts[0].toLowerCase()) ||
        brand?.url.toLowerCase().includes(parts[0].toLowerCase()) ||
        brand.url == slug
        // brand.name_hi.toLowerCase().includes(parts[0])
      );
    });
    return brand[0];
  }
  return '';
};
