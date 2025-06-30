# WelpenMatch Strapi CMS Schema

A comprehensive Strapi CMS structure for the WelpenMatch dog breeding platform, designed to support breeder profiles, puppy listings, litter management, and buyer applications with proper PostgreSQL relationships.

## 🏗️ Architecture Overview

### Core Content Types

1. **Breeder** - Main breeder profiles with mini-website capabilities
2. **BreedingDog** - Adult dogs used for breeding with health records
3. **Puppy** - Available puppies for sale with parent relationships
4. **Litter** - Planned or active litters with breeding information
5. **Buyer** - Dog buyers with preferences and profiles
6. **Application** - Puppy applications and waiting list entries

### Shared Components

1. **Health Document** - Medical records, vaccinations, genetic tests
2. **Contact Info** - Multi-channel contact details
3. **Media Gallery** - Image/video collections with metadata
4. **Location Data** - Geographic information with privacy controls
5. **Mini Website Config** - Subdomain and customization settings
6. **Buyer Preferences** - Breed and characteristic preferences

## 📊 Data Relationships

### Primary Relationships

```
Breeder (1) ←→ (Many) BreedingDogs
Breeder (1) ←→ (Many) Puppies
Breeder (1) ←→ (Many) Litters
BreedingDog (1) ←→ (Many) Puppies (as sire/dam)
Litter (1) ←→ (Many) Puppies
Buyer (1) ←→ (Many) Applications
Application (Many) ←→ (1) Breeder
Application (Many) ←→ (1) Puppy/Litter
```

### Relationship Details

#### Breeder Relationships
- **One-to-Many with BreedingDogs**: Each breeder owns multiple breeding dogs
- **One-to-Many with Puppies**: Each breeder lists multiple puppies
- **One-to-Many with Litters**: Each breeder manages multiple litters

#### BreedingDog Relationships
- **Many-to-One with Breeder**: Each dog belongs to one breeder
- **One-to-Many with Puppies**: As sire or dam parents

#### Puppy Relationships
- **Many-to-One with Breeder**: Listed by one breeder
- **Many-to-One with Litter**: Part of one litter
- **Many-to-One with BreedingDogs**: Has sire and dam parents
- **One-to-Many with Applications**: Can receive multiple applications

#### Litter Relationships
- **Many-to-One with Breeder**: Managed by one breeder
- **Many-to-One with BreedingDogs**: Has sire and dam parents
- **One-to-Many with Puppies**: Contains multiple puppies
- **One-to-Many with Applications**: Can receive applications

#### Application Relationships
- **Many-to-One with Buyer**: Submitted by one buyer
- **Many-to-One with Breeder**: Sent to one breeder
- **Many-to-One with Puppy/Litter**: For specific puppy or litter

## 🗂️ Content Type Details

### Breeder
**Purpose**: Complete breeder profiles with business information and mini-website capabilities

**Key Features**:
- Kennel registration and certifications
- Verification levels (none, basic, premium, elite)
- Mini-website configuration with custom domains
- Contact information and location data
- Media galleries and profile customization
- Rating and review system integration
- Subscription tiers and activity tracking

**Notable Fields**:
- `kennelName`: Primary business identifier
- `verificationLevel`: Trust indicator
- `miniWebsite`: Component for website configuration
- `specializations`: JSON array of breed focuses
- `healthTestingProtocols`: JSON health testing requirements

### BreedingDog
**Purpose**: Adult dogs used for breeding with comprehensive health documentation

**Key Features**:
- Complete pedigree and registration information
- Health clearances and genetic testing records
- Show titles and working certifications
- Breeding history tracking
- Stud availability and fees
- Temperament assessments

**Notable Fields**:
- `registrationNumber`: Official breed registry ID
- `healthDocuments`: Repeatable health document components
- `isAvailableForStud`: Stud service availability
- `breedingHistory`: JSON tracking of breeding activities
- `isRetired`: Retirement status tracking

### Puppy
**Purpose**: Available puppies for sale with detailed parent information

**Key Features**:
- Parent lineage with sire/dam relationships
- Health documentation and vaccination records
- Availability status management
- Pricing and deposit tracking
- Temperament testing results
- Media galleries for photos/videos

**Notable Fields**:
- `availabilityStatus`: Available, reserved, sold, not for sale
- `showPotential`: Pet, show prospect, breeding prospect, show quality
- `readyDate`: When puppy can go to new home
- `temperamentTest`: JSON results from temperament evaluation
- `inquiryCount`: Track buyer interest

### Litter
**Purpose**: Planned or active litters with comprehensive breeding information

**Key Features**:
- Breeding timeline tracking (planned → expecting → born → ready)
- Parent health testing documentation
- Expected vs actual puppy counts
- Waiting list management
- Color predictions and outcomes
- Pricing structure

**Notable Fields**:
- `status`: Planned, expecting, born, weaning, ready, completed
- `waitingListOpen`: Accepting applications
- `expectedColors`: JSON array of color predictions
- `whelping`: JSON whelping notes and timeline
- `isRepeatBreeding`: Indicates if parents bred before

### Buyer
**Purpose**: Dog buyers with detailed preferences and household information

**Key Features**:
- Comprehensive lifestyle questionnaire
- Breed and characteristic preferences
- Housing and family situation
- Veterinary references
- Previous pet experience
- Saved searches and favorites

**Notable Fields**:
- `preferences`: Component with detailed breed preferences
- `verificationLevel`: Background check status
- `favoriteBreeders`: JSON array of preferred breeders
- `applicationCount`: Number of applications submitted
- `successfulAdoptions`: Previous successful purchases

### Application
**Purpose**: Comprehensive application system for puppy purchases

**Key Features**:
- Multi-step application process
- Scoring and evaluation system
- Interview and home visit scheduling
- Payment tracking (deposits, final payment)
- Communication history
- Document management

**Notable Fields**:
- `applicationType`: Puppy, litter, or waiting list
- `status`: Pending → under review → approved/rejected
- `score`: Numerical evaluation (0-100)
- `questionnaire`: JSON comprehensive questionnaire
- `communicationHistory`: JSON message thread

## 🔧 Technical Features

### Database Configuration
- **PostgreSQL**: Primary database with proper relational structure
- **Connection pooling**: Optimized for performance
- **Schema validation**: Comprehensive data integrity

### Media Management
- **Multi-gallery support**: Organized image/video collections
- **File type restrictions**: Images and documents only
- **Upload size limits**: 250MB maximum

### Internationalization
- **Swiss market focus**: German primary language
- **Canton-specific location data**: Swiss geographic structure
- **Multi-language support**: Ready for expansion

### API Features
- **Custom endpoints**: Specialized queries for breeding platform
- **Population strategies**: Efficient relationship loading
- **Search functionality**: Breed, location, and characteristic filters
- **Status management**: Automated workflow transitions

### Security & Permissions
- **Role-based access**: Breeders, buyers, and admins
- **Data privacy**: Configurable visibility settings
- **Document verification**: Health certificate validation
- **User verification**: Multi-level trust system

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Strapi 5.15.0+

### Installation
```bash
# Install dependencies
npm install

# Configure database connection
# Edit config/database.js with your PostgreSQL credentials

# Start development server
npm run develop

# Build for production
npm run build
```

### Environment Variables
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=welpenmatch
DATABASE_USERNAME=welpenmatch
DATABASE_PASSWORD=welpenmatch
APP_KEYS=your_app_keys
ADMIN_JWT_SECRET=your_admin_secret
API_TOKEN_SALT=your_api_salt
```

## 📝 Usage Examples

### Creating a Breeder Profile
```javascript
const breeder = await strapi.entityService.create('api::breeder.breeder', {
  data: {
    kennelName: 'Alpine Dogs',
    firstName: 'Hans',
    lastName: 'Mueller',
    contactInfo: {
      primaryEmail: 'hans@alpinedogs.ch',
      primaryPhone: '+41 79 123 4567'
    },
    location: {
      city: 'Zurich',
      canton: 'ZH',
      country: 'Switzerland'
    },
    specializations: ['German Shepherd', 'Belgian Malinois']
  }
});
```

### Listing a Puppy
```javascript
const puppy = await strapi.entityService.create('api::puppy.puppy', {
  data: {
    name: 'Max',
    breed: 'German Shepherd',
    gender: 'male',
    birthDate: '2024-01-15',
    price: 2500,
    breeder: breederId,
    sire: sireId,
    dam: damId,
    availabilityStatus: 'available'
  }
});
```

## 📈 Future Enhancements

### Planned Features
- **Geographic search**: PostGIS integration for location-based queries
- **Payment processing**: Stripe integration for deposits/payments
- **Real-time messaging**: Chat system between buyers and breeders
- **Advanced analytics**: Business intelligence dashboard
- **Mobile optimization**: React Native app support

### Potential Integrations
- **Kennel clubs**: Import/sync registration data
- **Veterinary systems**: Health record integration
- **Genetic testing labs**: Automated results import
- **Social media**: Automated posting and sharing

## 🤝 Contributing

This schema structure provides a solid foundation for the WelpenMatch platform. When extending or modifying:

1. **Maintain relationships**: Ensure bidirectional relationships are properly configured
2. **Use components**: Leverage shared components for consistent data structure
3. **Follow conventions**: Maintain naming patterns and field types
4. **Document changes**: Update this README when adding new features
5. **Test thoroughly**: Validate all relationships work correctly

## 📄 License

This schema structure is designed specifically for the WelpenMatch dog breeding platform.