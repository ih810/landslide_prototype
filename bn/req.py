import os
import re
from collections import Counter

# This dict maps commonly renamed imports to their actual package names.
# Add to this dict if you have specific packages that are imported under aliases.
known_aliases = {
    'pd': 'pandas',
    'np': 'numpy',
    'plt': 'matplotlib',
    'sns': 'seaborn',
    'sklearn': 'scikit-learn',
    'mpl': 'matplotlib',
    'sp': 'scipy'
}

# This will contain all found package names.
all_packages = Counter()

# Regular expression to capture python import statements.
import_pattern = re.compile(r'^\s*(from\s+(\S+)|import\s+(\S+))')

def extract_packages_from_line(line):
    match = import_pattern.match(line)
    if match:
        # Group 2 is 'from' imports, and group 3 is 'import' imports.
        package = match.group(2) or match.group(3)
        # Take only the top-level package name (split by dot).
        top_level_package = package.split('.')[0]
        return top_level_package
    return None

for root, dirs, files in os.walk('.'):  # Walk through all files in the current directory and subdirectories
    for file in files:
        if file.endswith('.py'):  # Only check Python files
            with open(os.path.join(root, file), 'r', encoding='utf-8', errors='ignore') as f:
                for line in f:
                    package_name = extract_packages_from_line(line)
                    if package_name:
                        # Map package to its alias if exists, else keep the original name
                        standardized_package = known_aliases.get(package_name, package_name)
                        all_packages[standardized_package] += 1

# Removing standard library imports from the list, assuming they won't be in external dependencies.
# This list is not exhaustive. Add more if you know your project uses them.
std_lib = set(['os', 'sys', 're', 'math', 'datetime', 'json', 'logging', 'collections', 'itertools', 'functools'])

# Filter out standard library packages
external_packages = {pkg: count for pkg, count in all_packages.items() if pkg not in std_lib}

# Write the packages to requirements.txt
with open('requirements.txt', 'w') as req_file:
    for package in external_packages:
        req_file.write(f"{package}\n")

print(f"requirements.txt has been created with {len(external_packages)} packages.")
