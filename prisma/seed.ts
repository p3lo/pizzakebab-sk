import { db } from '~/utils/db.server';

async function seed() {
  const pizzas = getPizza();
  for (const pizza of pizzas) {
    await db.pizza.create({
      data: {
        name: pizza.name,
        description: pizza.description,
        size32cm: {
          create: {
            weight: pizza.size32cm.weight,
            price: pizza.size32cm.price,
          },
        },
        size50cm: {
          create: {
            weight: pizza.size50cm.weight,
            price: pizza.size50cm.price,
          },
        },
      },
    });
  }
}

seed();

function getPizza() {
  return [
    {
      name: 'Pizzata/Pizza štangle',
      description: 'Olivový olej, cesnak',
      size32cm: {
        weight: 280,
        price: 3.1,
      },
      size50cm: {
        weight: 550,
        price: 6.9,
      },
    },
    {
      name: 'Margharita',
      description: 'Rajčinová omáčka, syr',
      size32cm: {
        weight: 430,
        price: 4.5,
      },
      size50cm: {
        weight: 940,
        price: 10.2,
      },
    },
    {
      name: 'Prosciutto',
      description: 'Rajčinová omáčka, šunka, syr',
      size32cm: {
        weight: 520,
        price: 5.2,
      },
      size50cm: {
        weight: 1140,
        price: 13.5,
      },
    },
    {
      name: 'Prosciutto con Funghi',
      description: 'Rajčinová omáčka, šunka, šampiňóny, syr',
      size32cm: {
        weight: 550,
        price: 5.8,
      },
      size50cm: {
        weight: 1200,
        price: 14.6,
      },
    },
    {
      name: 'Al Tonno',
      description: 'Rajčinová omáčka, tuniak, cibuľa, syr',
      size32cm: {
        weight: 530,
        price: 6.5,
      },
      size50cm: {
        weight: 1160,
        price: 16.5,
      },
    },
    {
      name: 'Palermo di Diabolo',
      description: 'Rajčinová omáčka, pikantná saláma, feferóny, syr',
      size32cm: {
        weight: 530,
        price: 5.8,
      },
      size50cm: {
        weight: 1160,
        price: 14.6,
      },
    },
    {
      name: 'Quattro Stagioni',
      description: 'Rajčinová omáčka, šunka 1/4, šampiňóny 1/4, kukurica 1/4, rukola 1/4, syr',
      size32cm: {
        weight: 600,
        price: 6.8,
      },
      size50cm: {
        weight: 1230,
        price: 17.2,
      },
    },
    {
      name: 'O sole mio',
      description: 'Rajčinová omáčka, šunka, kukurica, vajce, syr',
      size32cm: {
        weight: 560,
        price: 5.8,
      },
      size50cm: {
        weight: 1230,
        price: 14.6,
      },
    },
    {
      name: 'Palma di montechiaro',
      description: 'Rajčinová omáčka, šunka, rukola, olivový olej, syr',
      size32cm: {
        weight: 550,
        price: 6.1,
      },
      size50cm: {
        weight: 1200,
        price: 15.5,
      },
    },
    {
      name: 'Agrigento',
      description: 'Rajčinová omáčka, baranie rohy, kuracie mäso',
      size32cm: {
        weight: 580,
        price: 6.9,
      },
      size50cm: {
        weight: 1230,
        price: 17.5,
      },
    },
    {
      name: 'Catania',
      description: 'Rajčinová omáčka, mleté mäso, syr',
      size32cm: {
        weight: 600,
        price: 6.5,
      },
      size50cm: {
        weight: 1230,
        price: 16.8,
      },
    },
    {
      name: 'Melissa',
      description: 'Rajčinová omáčka, sardele, sušené rajčiny, cesnak, syr',
      size32cm: {
        weight: 500,
        price: 5.9,
      },
      size50cm: {
        weight: 1050,
        price: 15.7,
      },
    },
    {
      name: 'Siciliana',
      description: 'Rajčinová omáčka, rukola, prosciutto, parmezán, olivový olej, syr',
      size32cm: {
        weight: 580,
        price: 8.9,
      },
      size50cm: {
        weight: 1230,
        price: 23.0,
      },
    },
    {
      name: 'Hawaii',
      description: 'Rajčinová omáčka, šunka, ananás, syr',
      size32cm: {
        weight: 580,
        price: 5.8,
      },
      size50cm: {
        weight: 1230,
        price: 14.6,
      },
    },
    {
      name: 'Quattro Formaggi',
      description: 'Rajčinová omáčka, štyri druhy syra',
      size32cm: {
        weight: 550,
        price: 6.6,
      },
      size50cm: {
        weight: 1210,
        price: 16.5,
      },
    },
    {
      name: 'Salami',
      description: 'Rajčinová omáčka, suchá saláma, syr',
      size32cm: {
        weight: 520,
        price: 5.2,
      },
      size50cm: {
        weight: 1140,
        price: 13.5,
      },
    },
    {
      name: 'Verdura',
      description: 'Rajčinová omáčka, paprika, rajčina, brokolica, kukurica, syr',
      size32cm: {
        weight: 530,
        price: 6.0,
      },
      size50cm: {
        weight: 1150,
        price: 15.0,
      },
    },
    {
      name: 'Gamberini',
      description: 'Rajčinová omáčka, krevety, cesnak, rukola, syr',
      size32cm: {
        weight: 520,
        price: 7.9,
      },
      size50cm: {
        weight: 1130,
        price: 19.0,
      },
    },
    {
      name: 'Frutti di Mare',
      description: 'Rajčinová omáčka, dary mora, syr',
      size32cm: {
        weight: 520,
        price: 8.3,
      },
      size50cm: {
        weight: 1130,
        price: 19.5,
      },
    },
    {
      name: 'Capricciosa',
      description: 'Rajčinová omáčka, suchá saláma, klobása, anglická slanina, syr',
      size32cm: {
        weight: 590,
        price: 6.8,
      },
      size50cm: {
        weight: 1240,
        price: 17.5,
      },
    },
  ];
}
