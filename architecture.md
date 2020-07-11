# Architecture

##  OverView  

### Module
  1.  generate folders
        - module
          - includes
          - css
          - js
  2.  create handlebar fileTemplates
      - module.php
      - frontend.php
  3.  parse data
      - pull out module global settings
      - pull out settings settings
  4.  loop through data and generate settings templates based on that
        - for each item loop through each array with in array maybe use recursion to grap templates and push data into them
        - push those templates into the large data array
  5.  push large data array into page template
  6.  write to file
  7.  save to correct folder
  8.  zip folder
  9.  send folder 

##  Template Pieces

### Settings

- Containers
  - tabs
  - sections
  
- fields
  - text
  - textarea
  - select
  - photo
  - icon
  - dimension
  - units
  - link
  - editor
  - HTML
  - align
  - fonts
  - color
  - video
  - form

- utils
  - toggle select 