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
  const kebabs = getKebab();
  for (const kebab of kebabs) {
    await db.kebab.create({
      data: {
        name: kebab.name,
        description: kebab.description,
        sizeSmall: {
          create: {
            weight: kebab.SizeSmallKebab.weight,
            price: kebab.SizeSmallKebab.price,
          },
        },
        sizeLarge: {
          create: {
            weight: kebab.SizeLargeKebab.weight,
            price: kebab.SizeLargeKebab.price,
          },
        },
      },
    });
  }
  const bagetas = getBageta();
  for (const bageta of bagetas) {
    await db.bageta.create({
      data: {
        name: bageta.name,
        description: bageta.description,
        sizeSmall: {
          create: {
            weight: bageta.SizeSmallBageta.weight,
            price: bageta.SizeSmallBageta.price,
          },
        },
        sizeLarge: {
          create: {
            weight: bageta.SizeLargeBageta.weight,
            price: bageta.SizeLargeBageta.price,
          },
        },
      },
    });
  }
  const salads = getSalat();
  for (const salad of salads) {
    await db.salat.create({
      data: {
        name: salad.name,
        description: salad.description,
        weight: salad.weight,
        price: salad.price,
      },
    });
  }
  const drinks = getDrinks();
  for (const drink of drinks) {
    await db.drink.create({
      data: {
        name: drink.name,
        description: drink.description,
        type: drink.type,
        price: drink.price,
      },
    });
  }
  const other = getOther();
  for (const otherItem of other) {
    await db.other.create({
      data: {
        name: otherItem.name,
        description: otherItem.description,
        weight: otherItem.weight,
        price: otherItem.price,
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

function getKebab() {
  return [
    {
      name: 'Domáca žemľa',
      description: 'Žemľa, čínska kapusta, rajčina, mäso, dressing',
      SizeSmallKebab: {
        weight: 270,
        price: 3.5,
      },
      SizeLargeKebab: {
        weight: 480,
        price: 6.3,
      },
    },
    {
      name: 'Tortilla',
      description: 'Tortilla, čínska kapusta, rajčina, mäso, dressing',
      SizeSmallKebab: {
        weight: 260,
        price: 3.4,
      },
      SizeLargeKebab: {
        weight: 430,
        price: 5.5,
      },
    },
    {
      name: 'Tanier',
      description: 'Hranolky/ryža, mäso, čínska kapusta, rajčina, dressing',
      SizeSmallKebab: {
        weight: 310,
        price: 4.6,
      },
      SizeLargeKebab: {
        weight: 580,
        price: 7.5,
      },
    },
    {
      name: 'Doner Box',
      description: 'Hranolky/ryža, mäso, čínska kapusta, rajčina, dressing',
      SizeSmallKebab: {
        weight: 300,
        price: 3.1,
      },
      SizeLargeKebab: {
        weight: 550,
        price: 6.0,
      },
    },
  ];
}

function getBageta() {
  return [
    {
      name: 'Šunkovo-syrová',
      description: 'Bageta, tatarská omáčka, šunka, syr, zelenina',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Syrová',
      description: 'Bageta, tatarská omáčka, zelenina, niva, eidam, mozzarela',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Slaninová',
      description: 'Bageta, tatarská omáčka, zelenina, slanina, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Kebab',
      description: 'Bageta, cesnakový dressing, zelenina, kebab mäso, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Salámová',
      description: 'Bageta, suchá saláma (pikantná saláma) , zelenina, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
  ];
}

function getSalat() {
  return [
    {
      name: 'Kurací klasik',
      description: 'Ľadový šalát, rajčina, uhorka, kurací steak, dresing',
      weight: 400,
      price: 5.2,
    },
    {
      name: 'Kurací špeciál',
      description:
        'rajčina, poľný šalát, kuracie kúsky, restovaná cibuľka, balsamico, sladké chilli, olivový olej, pečivo',
      weight: 380,
      price: 5.8,
    },
    {
      name: 'Jarný šalát',
      description: 'rajčina, poľný šalát, mozzarella, an.slaninka, balsamico, pečivo',
      weight: 350,
      price: 5.8,
    },
    {
      name: 'Avokádový šalát',
      description: 'avokádo, mozzarella, rajčina, poľný šalát, prosciutto, balsamico, pečivo',
      weight: 370,
      price: 5.8,
    },
    {
      name: 'Tuniakový šalát',
      description: 'zmes šalátov, tuniak, červená cibulka, balsamico',
      weight: 380,
      price: 5.8,
    },
    {
      name: 'Šalát Caprese',
      description: 'rajčina, mozzarela, olivový olej, balsamico, pečivo',
      weight: 430,
      price: 5.8,
    },
    {
      name: 'Kebab šalát klasik',
      description: 'čínska kapusta, rajčina, kebab mäso, dresing',
      weight: 350,
      price: 4.5,
    },
    {
      name: 'Kebab šalát špeciál',
      description: 'poľný šalát, ľadový šalát, rajčina, kebab mäso, dresing',
      weight: 350,
      price: 5.3,
    },
    { name: 'Miešaný šalát', description: 'Ľadový šalát, rajčina, uhorka', weight: 250, price: 4.0 },
  ];
}

function getDrinks() {
  return [
    {
      name: 'Coca-cola',
      description: 'fľaša 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Coca-cola zero',
      description: 'fľaša 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Fanta',
      description: 'fľaša 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Sprite',
      description: 'fľaša 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Ice tea broskyňa',
      description: 'fľaša 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Ice tea lemon',
      description: 'fľaša 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Cappy pomaranč',
      description: 'fľaša 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy multivitamín',
      description: 'fľaša 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy jablko',
      description: 'fľaša 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy jahoda',
      description: 'fľaša 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Bonaqua neperlivá',
      description: 'fľaša 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Bonaqua jemne perlivá',
      description: 'fľaša 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Bonaqua ochutená',
      description: 'fľaša 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Rajec ochutený materina dúška',
      description: 'fľaša 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Rajec ochutený egreš',
      description: 'fľaša 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Rajec ochutený púpava',
      description: 'fľaša 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Zlatý bažant radler',
      description: 'plechovka 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Zlatý bažant nealko',
      description: 'plechovka 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    { name: 'Corgoň', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Kozel', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Krušovice', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Zlatý Bažant', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Pilsner Urquell', description: 'plechovka 0,5l, 12%', type: 'alko', price: 1.8 },
    { name: 'Zlatý Bažant', description: 'plechovka 0,5l, 12%', type: 'alko', price: 1.8 },
  ];
}

function getOther() {
  return [
    {
      name: 'Cigánska pečienka v domácej žemli',
      description: 'Domáca žemľa, bravčová krkovička, restovaná cibuľka, horčica',
      weight: 320,
      price: 4.7,
    },
    {
      name: 'Cheese burger v domácej žemli',
      description: 'Domáca žemľa, vyprážaný syr, šalat, rajčina, uhorka, dresing',
      weight: 280,
      price: 4.3,
    },
    {
      name: 'Chicken burger v domácej žemli',
      description: 'Domáca žemľa, bravčová krkovička, restovaná cibuľka, horčica',
      weight: 280,
      price: 4.3,
    },
    {
      name: 'Hovädzí burger v domácej žemli',
      description: 'Domáca žemľa, hovädzie mäso, rajčina, uhorka, šalát, cibuľa, slaninka, dresing',
      weight: 300,
      price: 6.8,
    },
    {
      name: 'Kuracie krídla',
      description: 'pikantné/BBQ',
      weight: 300,
      price: 6.9,
    },
    {
      name: 'Vyprážaný syr',
      description: 'hranolky, zeleninová obloha',
      weight: 120,
      price: 6.0,
    },
    {
      name: 'Kurací rezeň',
      description: 'hranolky, zeleninová obloha',
      weight: 120,
      price: 6.3,
    },
  ];
}
