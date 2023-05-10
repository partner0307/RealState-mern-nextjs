-- CreateTable
CREATE TABLE `development` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bannerImg` VARCHAR(191) NOT NULL,
    `devName` VARCHAR(191) NOT NULL,
    `area` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `buildingType` VARCHAR(191) NOT NULL,
    `completiondate` VARCHAR(191) NOT NULL,
    `units` VARCHAR(191) NOT NULL,
    `floors` VARCHAR(191) NOT NULL,
    `areaCity` VARCHAR(191) NOT NULL,
    `developerName` VARCHAR(191) NOT NULL,
    `architectName` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `availavility` VARCHAR(191) NOT NULL,
    `developmentImage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leads` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assignedBy` VARCHAR(191) NOT NULL,
    `adminMessage` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `agentId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `custId` VARCHAR(191) NOT NULL,
    `customerNName` VARCHAR(191) NOT NULL,
    `emailId` VARCHAR(191) NOT NULL,
    `agentType` VARCHAR(191) NOT NULL,
    `phoneNo` VARCHAR(191) NOT NULL,
    `plan` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `locality` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `featuredProperty` VARCHAR(191) NOT NULL,
    `propertyFor` VARCHAR(191) NOT NULL,
    `propertyType` VARCHAR(191) NOT NULL,
    `thePrice` VARCHAR(191) NOT NULL,
    `securityDeposit` VARCHAR(191) NOT NULL,
    `beds` VARCHAR(191) NOT NULL,
    `baths` VARCHAR(191) NOT NULL,
    `kitchenSize` VARCHAR(191) NOT NULL,
    `buildupArea` VARCHAR(191) NOT NULL,
    `leaseDuration` VARCHAR(191) NOT NULL,
    `serventQuarters` VARCHAR(191) NOT NULL,
    `calling` VARCHAR(191) NOT NULL,
    `appliances` VARCHAR(191) NOT NULL,
    `floorSize` VARCHAR(191) NOT NULL,
    `flooringType` VARCHAR(191) NOT NULL,
    `dateAvailable` VARCHAR(191) NOT NULL,
    `propertyDesc` VARCHAR(191) NOT NULL,
    `accomodation` VARCHAR(191) NOT NULL,
    `plotSize` VARCHAR(191) NOT NULL,
    `yourBuilt` VARCHAR(191) NOT NULL,
    `parking` VARCHAR(191) NOT NULL,
    `services` VARCHAR(191) NOT NULL,
    `nearBylocality` VARCHAR(191) NOT NULL,
    `propertyImages` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `agentName` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `from` VARCHAR(191) NOT NULL,
    `reviewFrom` VARCHAR(191) NOT NULL,
    `reviewDesc` VARCHAR(191) NOT NULL,
    `knowledge` VARCHAR(191) NOT NULL,
    `responsive` VARCHAR(191) NOT NULL,
    `nrgoation` VARCHAR(191) NOT NULL,
    `punctuality` VARCHAR(191) NOT NULL,
    `approval` VARCHAR(191) NOT NULL,
    `expertise` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `userType` VARCHAR(191) NOT NULL,
    `authenticated` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `sales` VARCHAR(191) NOT NULL,
    `specialities` VARCHAR(191) NOT NULL,
    `aboutyou` VARCHAR(191) NOT NULL,
    `employee_photo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
