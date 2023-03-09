-- CreateTable
CREATE TABLE "Pizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Size32CmPizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "pizzaId" INTEGER,
    CONSTRAINT "Size32CmPizza_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Size50CmPizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "pizzaId" INTEGER,
    CONSTRAINT "Size50CmPizza_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pizzaprilohy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PrilohySize32CmPizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER,
    "price" REAL NOT NULL,
    "prilohaId" INTEGER,
    CONSTRAINT "PrilohySize32CmPizza_prilohaId_fkey" FOREIGN KEY ("prilohaId") REFERENCES "Pizzaprilohy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PrilohySize50CmPizza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER,
    "price" REAL NOT NULL,
    "prilohaId" INTEGER,
    CONSTRAINT "PrilohySize50CmPizza_prilohaId_fkey" FOREIGN KEY ("prilohaId") REFERENCES "Pizzaprilohy" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Kebab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SizeSmallKebab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "kebabId" INTEGER,
    CONSTRAINT "SizeSmallKebab_kebabId_fkey" FOREIGN KEY ("kebabId") REFERENCES "Kebab" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SizeLargeKebab" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "kebabId" INTEGER,
    CONSTRAINT "SizeLargeKebab_kebabId_fkey" FOREIGN KEY ("kebabId") REFERENCES "Kebab" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bageta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SizeSmallBageta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "bagetaId" INTEGER,
    CONSTRAINT "SizeSmallBageta_bagetaId_fkey" FOREIGN KEY ("bagetaId") REFERENCES "Bageta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SizeLargeBageta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "bagetaId" INTEGER,
    CONSTRAINT "SizeLargeBageta_bagetaId_fkey" FOREIGN KEY ("bagetaId") REFERENCES "Bageta" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Salat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Drink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Other" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PizzaCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "PizzaCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PizzaCartPriloha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "PizzaCartPriloha_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "PizzaCart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KebabCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "KebabCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BagetaCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "BagetaCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SalatCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "SalatCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DrinkCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "DrinkCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OtherCart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "cartId" INTEGER,
    CONSTRAINT "OtherCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "address" TEXT,
    "city" TEXT,
    "email" TEXT,
    "phone" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PizzaOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "PizzaOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PizzaOrderPriloha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "PizzaOrderPriloha_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PizzaOrder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "KebabOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "KebabOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BagetaOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "BagetaOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SalatOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "SalatOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DrinkOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "DrinkOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OtherOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "OtherOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Size32CmPizza_pizzaId_key" ON "Size32CmPizza"("pizzaId");

-- CreateIndex
CREATE UNIQUE INDEX "Size50CmPizza_pizzaId_key" ON "Size50CmPizza"("pizzaId");

-- CreateIndex
CREATE UNIQUE INDEX "PrilohySize32CmPizza_prilohaId_key" ON "PrilohySize32CmPizza"("prilohaId");

-- CreateIndex
CREATE UNIQUE INDEX "PrilohySize50CmPizza_prilohaId_key" ON "PrilohySize50CmPizza"("prilohaId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeSmallKebab_kebabId_key" ON "SizeSmallKebab"("kebabId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeLargeKebab_kebabId_key" ON "SizeLargeKebab"("kebabId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeSmallBageta_bagetaId_key" ON "SizeSmallBageta"("bagetaId");

-- CreateIndex
CREATE UNIQUE INDEX "SizeLargeBageta_bagetaId_key" ON "SizeLargeBageta"("bagetaId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
