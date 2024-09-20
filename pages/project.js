import { TOKEN, DATABASE_ID } from "@/config"
import Layout from "@/components/layout";
import Head from "next/head";
import ProjectItem from "@/components/projects/project_item";
import Grid from "@mui/material/Grid2";

export default function Project({ Projects }) {
    return (
        <>
            <Layout>    
                <Head>
                    <title>보영 포트폴리오</title>
                    <meta name="description" content="나의 포트폴리오" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <h1>프로젝트</h1>
                <h3>총 프로젝트 : {Projects.results.length}</h3>
                <Grid container justifyContent="center" spacing={10}>
                    {Projects && Projects.results.map((aProject) => (
                        <ProjectItem key={aProject.id} data={aProject}/>
                    ))}
                </Grid>
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const option = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({ page_size: 100 })
    };
    const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, option);
    const Projects = await res.json();

    Projects.results.sort((a, b) => {
        const titleA = a.properties.이름.title[0]?.plain_text || '';
        const titleB = b.properties.이름.title[0]?.plain_text || '';

        const isEnglishA = /^[A-Za-z]/.test(titleA);
        const isEnglishB = /^[A-Za-z]/.test(titleB);

        if (isEnglishA && !isEnglishB) return -1;
        if (!isEnglishA && isEnglishB) return 1;
        return titleA.localeCompare(titleB);
    });

    return {
        props: { Projects }
    };
}
