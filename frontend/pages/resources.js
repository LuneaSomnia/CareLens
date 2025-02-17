import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Resources() {
  const [resources, setResources] = useState(null)

  useEffect(() => {
    // Fetch educational resources from backend API
    axios.get('/api/resources')
      .then(response => setResources(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">Educational Resources</h2>
        {resources ? (
          <div>
            <h3 className="text-frost-dark">Articles</h3>
            <ul>
              {resources.articles.map(article => (
                <li key={article.id}>
                  <a className="text-frost-dark underline" href={article.url} target="_blank">
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-frost-dark mt-4">Videos</h3>
            <ul>
              {resources.videos.map(video => (
                <li key={video.id}>
                  <a className="text-frost-dark underline" href={video.url} target="_blank">
                    {video.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-frost-dark">Loading resources...</p>
        )}
      </div>
    </Layout>
  )
}
