import { Link } from 'react-router-dom'
import Page from '../components/Page'
import PageHead from '../components/PageHead'

export default function NotFound() {
  return (
    <Page title="Not found" className="notfound">
      <PageHead label="Error 404" title="Lost page" lead="This page has fallen out of the scrapbook.">
        <div className="actions"><Link className="btn" to="/">Back to the first page <span className="arrow">→</span></Link></div>
      </PageHead>
    </Page>
  )
}
