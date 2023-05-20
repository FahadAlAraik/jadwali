Jadwali
=======

Jadwali is a web application designed to assist King Saud University students in creating automatic schedules based on their desired courses. It also provides information about potential conflicts for final exams or course days. The application is developed using Flask, a Python web framework.

Dependencies
------------

To run Jadwali, you need to have the following dependencies installed:

*   Flask: A lightweight web framework for Python. Install it using `pip install flask`.
*   Pandas: A data manipulation library for Python. Install it using `pip install pandas`.
*   Gunicorn: A WSGI HTTP server for running Python web applications. Install it using `pip install gunicorn`.

Getting Started
---------------

To get started with Jadwali, follow these steps:

1.  Clone the repository:

    `git clone https://github.com/your-username/jadwali.git`
    
2.  Change into the project directory:
   
    `cd jadwali`
    
3.  Install the project dependencies using `pip`:
    
    `pip install -r requirements.txt`
    
4.  Run the application using the Flask development server:
    
    `flask run`
    
    The application will be accessible at `http://localhost:5000`.
    
5.  Alternatively, you can deploy the application using Gunicorn:
    
    `gunicorn app:app`
    
    The application will be accessible at `http://localhost:8000`.
    

Usage
-----

Once the application is running, you can access it in your web browser at the provided URL. Follow the on-screen instructions to create automatic schedules and check for conflicts regarding final exams or course days.

Contributing
------------

If you wish to contribute to Jadwali, please follow these guidelines:

1.  Fork the repository on GitHub.
2.  Create a new branch from the `main` branch for your work.
3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your forked repository.
5.  Submit a pull request to the original repository, describing the changes you made.
