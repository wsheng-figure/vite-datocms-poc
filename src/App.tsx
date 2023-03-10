import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const DATO_API_TOKEN = 'bb82b0f655a934b55179f8bc60a4b7';
const client = new GraphQLClient({
  url: "https://graphql.datocms.com/",
  headers: {
    "Authorization": `Bearer ${DATO_API_TOKEN}`,
    "X-Include-Drafts": "true",
  }
});

const pages = import.meta.glob('./pages/*.tsx', { eager: true })

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)[1]
  return {
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
    component: pages[path].default,
  }
})

function App() {
  return (
    <div className="App">
      <ClientContext.Provider value={client}>
        <header className="flex justify-between items-center h-20">
          <a href="/" className="italic text-3xl font-extrabold text-indigo-700">Vite + DatoCms</a>
          <nav>
            <ul className="flex gap-x-4">
              {routes.reverse().slice(1).map(({ name, path }, index) => {
                return (
                  <li key={path}>
                    <Link className={`bg-teal-300 text-teal-900 font-medium rounded-full px-4 py-2 inline-block w-36 text-center`} to={path}>Another Page</Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </header>
        <Routes>
          {routes.map(({ path, component: RouteComp }) => {
            return <Route key={path} path={path} element={<RouteComp />}></Route>
          })}
        </Routes>
      </ClientContext.Provider>
    </div>
  )
}

export default App
