# Project Name

    Nooriam Ecommerce Project

## Description

a simplified e-commerce platform using React that allows users to view
products and add them to a shopping cart

## Table of Contents

- [Requirement](#requirement)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)
- [Contributing](#contributing)
- [License](#license)

## Requirement

This project requires Node.js to be installed. and it specifically requires a version greater than v20.11.0 Download and install it from [nodejs.org](https://nodejs.org/).

## Installation

**Install backend**

```bash
    cd backend
    npm install
```

**Install frontend**

```bash
    cd ecommerce
    npm install
```

## Usage

**Run backend**

```bash
    cd backend
    npm run dev
```

**Run frontend**

```bash
    cd ecommerce
    npm run dev
```

**Run tests**

```bash
    cd ecommerce
    npm run test
```

## Architecture

    Overview: This Application are separated into two pages, one is Product Listing Page, the other is the Cart Page

    Technologies:
        - Frontend build tool (Vite vs create-react-app): used Vite, which is more popular, fast and light weight
        - React UI Library (MUI): it's easier to build a decent responsive app with UI library
        - API integration (fetch/axios/react-query): the app is very simple, we don't need interceptors or cache in frontend, so used fetch
        - State Management (Context vs Redux): the Global State in this app is very simple and not deep nested, Context is enough to handle global state

## Assumptions and Design Decisions

Design Link: https://excalidraw.com/#json=XpCAxy5rS0jdx1bJRaRTY,hNlPAvuiObICL2ZwNu4OSw

Assumptions:

- assume we have a cart page for users to manage the products in cart
- assume we might have multiple products, so introduced pagination, which combined with search and filter
- assume when user refresh the page, we still want to keep the product in cart, so I used localstorage to store the products in cart
