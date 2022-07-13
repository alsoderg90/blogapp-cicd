# CI/CD pipeline for python envinment

Tools for common pipeline steps are following:

- **Linting**: Python have many basic linters and couple multiple linters. We choose multilinter called Pylama to get the best result. It combines following linters:
    - pycodestyle (formerly pep8)
    - pydocstyle (formerly pep257)
    - PyFlakes
    - Mccabe
    - Pylint
    - Radon
    - gjslint

    Style and complexity check is from pycodestyle and logical
lint detection is from PyFlakes.


- **Testing**: For unit testing we choose pytest library. It's one of the most popular testing tools for python. Tests don't require a lot of code writing, it have many time-saving  commands and many useful plugins have been made for it. 

- **Building**: Our Python project will use following project structure:
    ```python
    packaging_tutorial/
    ├── LICENSE
    ├── pyproject.toml
    ├── README.md
    ├── src/
    │   └── example_package/
    │       ├── __init__.py
    │       └── example.py
    └── tests/
    ```
    *.toml*-file tells buid tools (like *pip* and *build*) what tools is needed to building process. It contains relevant information (package name, version, authors, license, dependencies etc..) about our project. 
    
    *src*-folder contains the source code files.

- **CI/CD pipelines**
    There are many alternative CI/CD-pipelines besides Jenkins and GitHub Actions. Following are widely used:
    - Travis CI
    - Appveyor
    - Circle CI
    - Semaphore CI
    - Gitlab CI
    
    We choose Gitlab CI it because it is familiar to us from before.

- **Self-hosted or a cloud-based environment**
	We choose cloud-based becouse we dont want 
	spend too much time with maintaining the CI/CD setup.