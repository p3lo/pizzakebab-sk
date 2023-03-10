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
  const prilohy = getPrilohy();
  for (const priloha of prilohy) {
    await db.pizzaprilohy.create({
      data: {
        name: priloha.name,
        prilohy32cm: {
          create: {
            weight: priloha.prilohy32cm.weight,
            price: priloha.prilohy32cm.price,
          },
        },
        prilohy50cm: {
          create: {
            weight: priloha.prilohy50cm.weight,
            price: priloha.prilohy50cm.price,
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
      name: 'Pizzata/Pizza ??tangle',
      description: 'Olivov?? olej, cesnak',
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
      description: 'Raj??inov?? om????ka, syr',
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
      description: 'Raj??inov?? om????ka, ??unka, syr',
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
      description: 'Raj??inov?? om????ka, ??unka, ??ampi????ny, syr',
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
      description: 'Raj??inov?? om????ka, tuniak, cibu??a, syr',
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
      description: 'Raj??inov?? om????ka, pikantn?? sal??ma, fefer??ny, syr',
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
      description: 'Raj??inov?? om????ka, ??unka 1/4, ??ampi????ny 1/4, kukurica 1/4, rukola 1/4, syr',
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
      description: 'Raj??inov?? om????ka, ??unka, kukurica, vajce, syr',
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
      description: 'Raj??inov?? om????ka, ??unka, rukola, olivov?? olej, syr',
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
      description: 'Raj??inov?? om????ka, baranie rohy, kuracie m??so',
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
      description: 'Raj??inov?? om????ka, mlet?? m??so, syr',
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
      description: 'Raj??inov?? om????ka, sardele, su??en?? raj??iny, cesnak, syr',
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
      description: 'Raj??inov?? om????ka, rukola, prosciutto, parmez??n, olivov?? olej, syr',
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
      description: 'Raj??inov?? om????ka, ??unka, anan??s, syr',
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
      description: 'Raj??inov?? om????ka, ??tyri druhy syra',
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
      description: 'Raj??inov?? om????ka, such?? sal??ma, syr',
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
      description: 'Raj??inov?? om????ka, paprika, raj??ina, brokolica, kukurica, syr',
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
      description: 'Raj??inov?? om????ka, krevety, cesnak, rukola, syr',
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
      description: 'Raj??inov?? om????ka, dary mora, syr',
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
      description: 'Raj??inov?? om????ka, such?? sal??ma, klob??sa, anglick?? slanina, syr',
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
      name: 'Dom??ca ??em??a',
      description: '??em??a, ????nska kapusta, raj??ina, m??so, dressing',
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
      description: 'Tortilla, ????nska kapusta, raj??ina, m??so, dressing',
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
      description: 'Hranolky/ry??a, m??so, ????nska kapusta, raj??ina, dressing',
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
      description: 'Hranolky/ry??a, m??so, ????nska kapusta, raj??ina, dressing',
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
      name: '??unkovo-syrov??',
      description: 'Bageta, tatarsk?? om????ka, ??unka, syr, zelenina',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Syrov??',
      description: 'Bageta, tatarsk?? om????ka, zelenina, niva, eidam, mozzarela',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Slaninov??',
      description: 'Bageta, tatarsk?? om????ka, zelenina, slanina, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Kebab',
      description: 'Bageta, cesnakov?? dressing, zelenina, kebab m??so, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
    {
      name: 'Sal??mov??',
      description: 'Bageta, such?? sal??ma (pikantn?? sal??ma) , zelenina, syr',
      SizeSmallBageta: { weight: 220, price: 2.8 },
      SizeLargeBageta: { weight: 350, price: 3.8 },
    },
  ];
}

function getSalat() {
  return [
    {
      name: 'Kurac?? klasik',
      description: '??adov?? ??al??t, raj??ina, uhorka, kurac?? steak, dresing',
      weight: 400,
      price: 5.2,
    },
    {
      name: 'Kurac?? ??peci??l',
      description:
        'raj??ina, po??n?? ??al??t, kuracie k??sky, restovan?? cibu??ka, balsamico, sladk?? chilli, olivov?? olej, pe??ivo',
      weight: 380,
      price: 5.8,
    },
    {
      name: 'Jarn?? ??al??t',
      description: 'raj??ina, po??n?? ??al??t, mozzarella, an.slaninka, balsamico, pe??ivo',
      weight: 350,
      price: 5.8,
    },
    {
      name: 'Avok??dov?? ??al??t',
      description: 'avok??do, mozzarella, raj??ina, po??n?? ??al??t, prosciutto, balsamico, pe??ivo',
      weight: 370,
      price: 5.8,
    },
    {
      name: 'Tuniakov?? ??al??t',
      description: 'zmes ??al??tov, tuniak, ??erven?? cibulka, balsamico',
      weight: 380,
      price: 5.8,
    },
    {
      name: '??al??t Caprese',
      description: 'raj??ina, mozzarela, olivov?? olej, balsamico, pe??ivo',
      weight: 430,
      price: 5.8,
    },
    {
      name: 'Kebab ??al??t klasik',
      description: '????nska kapusta, raj??ina, kebab m??so, dresing',
      weight: 350,
      price: 4.5,
    },
    {
      name: 'Kebab ??al??t ??peci??l',
      description: 'po??n?? ??al??t, ??adov?? ??al??t, raj??ina, kebab m??so, dresing',
      weight: 350,
      price: 5.3,
    },
    { name: 'Mie??an?? ??al??t', description: '??adov?? ??al??t, raj??ina, uhorka', weight: 250, price: 4.0 },
  ];
}

function getDrinks() {
  return [
    {
      name: 'Coca-cola',
      description: 'f??a??a 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Coca-cola zero',
      description: 'f??a??a 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Fanta',
      description: 'f??a??a 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Sprite',
      description: 'f??a??a 2l',
      type: 'nealko',
      price: 2.5,
    },
    {
      name: 'Ice tea brosky??a',
      description: 'f??a??a 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Ice tea lemon',
      description: 'f??a??a 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Cappy pomaran??',
      description: 'f??a??a 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy multivitam??n',
      description: 'f??a??a 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy jablko',
      description: 'f??a??a 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Cappy jahoda',
      description: 'f??a??a 0,33l',
      type: 'nealko',
      price: 1.4,
    },
    {
      name: 'Bonaqua neperliv??',
      description: 'f??a??a 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Bonaqua jemne perliv??',
      description: 'f??a??a 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Bonaqua ochuten??',
      description: 'f??a??a 0,5l',
      type: 'nealko',
      price: 1.3,
    },
    {
      name: 'Rajec ochuten?? materina d????ka',
      description: 'f??a??a 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Rajec ochuten?? egre??',
      description: 'f??a??a 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Rajec ochuten?? p??pava',
      description: 'f??a??a 0,75l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Zlat?? ba??ant radler',
      description: 'plechovka 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    {
      name: 'Zlat?? ba??ant nealko',
      description: 'plechovka 0,5l',
      type: 'nealko',
      price: 1.5,
    },
    { name: 'Corgo??', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Kozel', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Kru??ovice', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Zlat?? Ba??ant', description: 'plechovka 0,5l, 10%', type: 'alko', price: 1.5 },
    { name: 'Pilsner Urquell', description: 'plechovka 0,5l, 12%', type: 'alko', price: 1.8 },
    { name: 'Zlat?? Ba??ant', description: 'plechovka 0,5l, 12%', type: 'alko', price: 1.8 },
  ];
}

function getOther() {
  return [
    {
      name: 'Cig??nska pe??ienka v dom??cej ??emli',
      description: 'Dom??ca ??em??a, brav??ov?? krkovi??ka, restovan?? cibu??ka, hor??ica',
      weight: 320,
      price: 4.7,
    },
    {
      name: 'Cheese burger v dom??cej ??emli',
      description: 'Dom??ca ??em??a, vypr????an?? syr, ??alat, raj??ina, uhorka, dresing',
      weight: 280,
      price: 4.3,
    },
    {
      name: 'Chicken burger v dom??cej ??emli',
      description: 'Dom??ca ??em??a, brav??ov?? krkovi??ka, restovan?? cibu??ka, hor??ica',
      weight: 280,
      price: 4.3,
    },
    {
      name: 'Hov??dz?? burger v dom??cej ??emli',
      description: 'Dom??ca ??em??a, hov??dzie m??so, raj??ina, uhorka, ??al??t, cibu??a, slaninka, dresing',
      weight: 300,
      price: 6.8,
    },
    {
      name: 'Kuracie kr??dla',
      description: 'pikantn??/BBQ',
      weight: 300,
      price: 6.9,
    },
    {
      name: 'Vypr????an?? syr',
      description: 'hranolky, zeleninov?? obloha',
      weight: 120,
      price: 6.0,
    },
    {
      name: 'Kurac?? reze??',
      description: 'hranolky, zeleninov?? obloha',
      weight: 120,
      price: 6.3,
    },
  ];
}

function getPrilohy() {
  return [
    {
      name: 'Anan??s',
      prilohy32cm: {
        weight: 80,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 170,
        price: 1.2,
      },
    },
    {
      name: 'Cibu??a',
      prilohy32cm: {
        weight: 50,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 110,
        price: 1.2,
      },
    },
    {
      name: 'Cesnak',
      prilohy32cm: {
        weight: 5,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 10,
        price: 1.2,
      },
    },
    {
      name: 'Raj??ina',
      prilohy32cm: {
        weight: 60,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 130,
        price: 1.2,
      },
    },
    {
      name: 'Brokolica',
      prilohy32cm: {
        weight: 50,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 110,
        price: 1.2,
      },
    },
    {
      name: '??ampi????ny',
      prilohy32cm: {
        weight: 60,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 130,
        price: 1.2,
      },
    },
    {
      name: 'Kukurica',
      prilohy32cm: {
        weight: 60,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 130,
        price: 1.2,
      },
    },
    {
      name: 'Paprika',
      prilohy32cm: {
        weight: 50,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 110,
        price: 1.2,
      },
    },
    {
      name: 'Olivy',
      prilohy32cm: {
        weight: 30,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.2,
      },
    },
    {
      name: '??unka',
      prilohy32cm: {
        weight: 60,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 130,
        price: 1.8,
      },
    },
    {
      name: 'Such?? sal??ma',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Pikantn?? sal??ma',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Baramie rohy',
      prilohy32cm: {
        weight: 40,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 85,
        price: 1.8,
      },
    },
    {
      name: 'Chilli',
      prilohy32cm: {
        weight: 5,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 10,
        price: 1.8,
      },
    },
    {
      name: 'Fefer??ny',
      prilohy32cm: {
        weight: 20,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 40,
        price: 1.8,
      },
    },
    {
      name: 'Syr Niva',
      prilohy32cm: {
        weight: 20,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 40,
        price: 1.8,
      },
    },
    {
      name: 'Mozarella',
      prilohy32cm: {
        weight: 60,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 125,
        price: 1.8,
      },
    },
    {
      name: 'Syr Eidam',
      prilohy32cm: {
        weight: 70,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 150,
        price: 1.8,
      },
    },
    {
      name: 'Parmez??n',
      prilohy32cm: {
        weight: 5,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 10,
        price: 1.8,
      },
    },
    {
      name: 'Arti??oky',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Vajce',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Rukola',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: '??pargla',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Capari',
      prilohy32cm: {
        weight: 30,
        price: 0.9,
      },
      prilohy50cm: {
        weight: 65,
        price: 1.8,
      },
    },
    {
      name: 'Cesnakov?? dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Bylinkov?? dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Franc??zsky dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Jogurtov?? dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Sweet-Chilli dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Pikantn?? dressing',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Ke??up',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Tatarsk?? om????ka',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },

    {
      name: 'Majon??za',
      prilohy32cm: {
        weight: 0,
        price: 0.6,
      },
      prilohy50cm: {
        weight: 0,
        price: 1.2,
      },
    },
    {
      name: 'Mlet?? m??so',
      prilohy32cm: {
        weight: 70,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 150,
        price: 2.0,
      },
    },
    {
      name: 'Kuracie m??so',
      prilohy32cm: {
        weight: 70,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 150,
        price: 2.0,
      },
    },
    {
      name: 'Kebab m??so',
      prilohy32cm: {
        weight: 70,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 150,
        price: 2.0,
      },
    },
    {
      name: 'Tuniak',
      prilohy32cm: {
        weight: 50,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 110,
        price: 2.0,
      },
    },
    {
      name: 'Klob??sa',
      prilohy32cm: {
        weight: 50,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 110,
        price: 2.0,
      },
    },
    {
      name: 'Anglick?? slanina',
      prilohy32cm: {
        weight: 50,
        price: 1.0,
      },
      prilohy50cm: {
        weight: 110,
        price: 2.0,
      },
    },
    {
      name: 'Proscuitto di Parma',
      prilohy32cm: {
        weight: 30,
        price: 2.8,
      },
      prilohy50cm: {
        weight: 65,
        price: 5.5,
      },
    },
    {
      name: 'Krevety',
      prilohy32cm: {
        weight: 70,
        price: 2.8,
      },
      prilohy50cm: {
        weight: 140,
        price: 5.5,
      },
    },
    {
      name: 'Dary Mora',
      prilohy32cm: {
        weight: 70,
        price: 2.8,
      },
      prilohy50cm: {
        weight: 140,
        price: 5.5,
      },
    },
  ];
}
