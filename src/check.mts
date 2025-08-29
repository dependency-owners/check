import {
  error,
  getInput,
  setOutput,
  type AnnotationProperties,
} from '@actions/core';
import { dependencyOwners, DependencyOwnersOptions } from 'dependency-owners';
import { getUnownedDependencies } from 'dependency-owners/utils';

/**
 * Checks for unowned dependencies in the project.
 * @returns True if there are no unowned dependencies, false otherwise.
 */
export const checkUnownedDependencies = async (): Promise<boolean> => {
  // Inputs
  const configFile = getInput('config-file');
  const dependencyFile = getInput('dependency-file', { required: true });
  const loader = getInput('loader', { required: true });

  // Determine paths for loader resolution
  const paths = [];
  if (process.env.GITHUB_WORKSPACE) {
    paths.push(process.env.GITHUB_WORKSPACE);
  }

  // Build options for dependency-owners
  const options: DependencyOwnersOptions = {
    configFile,
    dependencyFile,
    loader: require.resolve(loader, { paths }),
  };

  // Run dependency-owners
  const results = await dependencyOwners(options);

  // Get unowned dependencies
  const unownedDeps = getUnownedDependencies(results);
  if (unownedDeps.length > 0) {
    const properties: AnnotationProperties = {
      file: dependencyFile,
    };
    error(`Found unowned dependencies: ${unownedDeps.join(', ')}`, properties);
  }
  setOutput('unowned-dependencies', unownedDeps);
  setOutput('unowned-dependencies-found', unownedDeps.length > 0);
  return unownedDeps.length === 0;
};
