const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const websiteURL = document.querySelector('input[type="text"]').value;

  // Check domain age
  const response1 = await fetch(`https://api.domainsdb.info/v1/domains/search?domain=${websiteURL}`);
  const data1 = await response1.json();
  const domainAge = new Date(data1.domains[0].create_date);
  console.log(`Domain age: ${new Date().getFullYear() - domainAge.getFullYear()} years`);

  // Check hosting information
  const response2 = await fetch(`https://api.hackertarget.com/hostsearch/?q=${websiteURL}`);
  const data2 = await response2.text();
  console.log(`Hosting information: ${data2}`);


  // Check website framework
  const script = document.createElement('script');
  script.src = `https://builtwith.com/builtwith.js?d=${websiteURL}`;
  document.body.appendChild(script);

  setTimeout(() => {
    const technologies = BuiltWith && BuiltWith.allTechnology;
    console.log(`Website framework: ${technologies}`);
  }, 2000);


});
