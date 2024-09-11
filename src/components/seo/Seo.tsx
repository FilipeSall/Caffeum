import { Helmet } from "react-helmet-async";
import { SeoProps } from "../../Global/Types";

function Seo({ title, description, type = 'website' }: SeoProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content="https://caffeumv2.web.app" />
            <meta name="keywords"
                content="links de IA, ferramentas de IA, sites de IA, frameworks, desenvolvedores, tecnologia, recursos para desenvolvedores, links úteis, Links Hub, links, caffeum, caffeumv2, Hub, Caffeum, app, café, clima, temperatura, Painel climatico, estudos" />
            <meta http-equiv="Content-Language" content="pt-BR" />
            <meta name="author" content="Filipe Salles" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="Caffeum" />
            <meta property="og:description"
                content="Caffeum é um portal dedicado a armazenar e compartilhar links de IA, sites, ferramentas e frameworks essenciais para desenvolvedores e entusiastas da tecnologia. Que tal tomar um café enquanto explora tecnologias úteis para o trabalho?" />
            <meta property="og:url" content="https://caffeumv2.web.app" />
            <meta property="og:type" content="website" />
            <meta property="og:image"
                content="https://firebasestorage.googleapis.com/v0/b/caffeumv2.appspot.com/o/images%2Fogimglow.jpg?alt=media&token=7c8d5053-49e2-4cc4-a418-71ad8af9e0d2" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Caffeum" />
            <meta name="twitter:description"
                content="Caffeum é um portal dedicado a armazenar e compartilhar links de IA, sites, ferramentas e frameworks essenciais para desenvolvedores e entusiastas da tecnologia. Que tal tomar um café enquanto explora tecnologias úteis para o trabalho?" />
            <meta property="og:url" content="https://caffeumv2.web.app" />
            <meta property="og:image"
                content="https://firebasestorage.googleapis.com/v0/b/caffeumv2.appspot.com/o/images%2Fogimglow.jpg?alt=media&token=7c8d5053-49e2-4cc4-a418-71ad8af9e0d2" />
        </Helmet>
    )
}

export default Seo