import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { locationsData } from '../data/locations';
import { propertyTypesData } from '../data/property-types';

const publicDir = join(process.cwd(), 'public');

async function createFolders() {
  // Create locations folders
  for (const location of locationsData) {
    if (location.slug === 'remote') continue; // Skip remote
    const folderPath = join(publicDir, 'locations', location.slug);
    try {
      await mkdir(folderPath, { recursive: true });
      // Create .gitkeep to ensure folder is tracked
      await writeFile(join(folderPath, '.gitkeep'), '');
      console.log(`Created folder: ${folderPath}`);
    } catch (error) {
      console.error(`Error creating folder ${folderPath}:`, error);
    }
  }

  // Create property types folders
  for (const propertyType of propertyTypesData) {
    const folderPath = join(publicDir, 'property-types', propertyType.slug);
    try {
      await mkdir(folderPath, { recursive: true });
      // Create .gitkeep to ensure folder is tracked
      await writeFile(join(folderPath, '.gitkeep'), '');
      console.log(`Created folder: ${folderPath}`);
    } catch (error) {
      console.error(`Error creating folder ${folderPath}:`, error);
    }
  }

  console.log('All folders created successfully!');
}

createFolders().catch(console.error);



