import {
  error,
  getInput,
  setOutput,
  type AnnotationProperties,
} from '@actions/core';
import { dependencyOwners } from 'dependency-owners';
import { getUnownedDependencies } from 'dependency-owners/utils';
import { readFile } from 'node:fs/promises';

/**
 * Checks for unowned dependencies in the project.
 * @returns True if there are no unowned dependencies, false otherwise.
 */
export const checkUnownedDependencies = async (): Promise<boolean> => {
  // Inputs
  const configFile = getInput('config-file');
  const dependencyFile = getInput('dependency-file');
  const loader = getInput('loader');

  // Run dependency-owners
  const results = await dependencyOwners({
    configFile,
    dependencyFile,
    loader,
  });

  // Get unowned dependencies
  const unownedDeps = getUnownedDependencies(results);
  if (unownedDeps.length > 0) {
    const fileContent = await readFile(dependencyFile, 'utf-8');
    const lines = fileContent.split('\n');

    unownedDeps.forEach((dep: string) => {
      const properties: AnnotationProperties = {
        file: dependencyFile,
      };
      const startLine = lines.findIndex((line) => line.includes(dep)) + 1;
      if (startLine > 0) {
        properties.startLine = startLine;
      }
      error(`Found unowned dependency: ${dep}`, properties);
    });
  }
  setOutput('unowned-dependencies', unownedDeps);
  setOutput('unowned-dependencies-found', unownedDeps.length > 0);
  return unownedDeps.length === 0;
};
