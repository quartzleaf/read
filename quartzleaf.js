// 1. Paste your unique Supabase credentials here
const SUPABASE_URL = 'https://your-project-id.supabase.co'; 
const SUPABASE_ANON_KEY = 'your-actual-anon-public-key';

// 2. Initialize the Supabase client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Create an asynchronous function to fetch your data
async function loadContent() {
    const container = document.getElementById('writing-container');

    try {
        // Fetch everything from your 'poems' table (change 'poems' to your exact table name)
        const { data: items, error } = await supabase
            .from('poems')
            .select('*');

        // If Supabase returns an error, catch it here
        if (error) throw error;

        // If the database is completely empty
        if (!items || items.length === 0) {
            container.innerHTML = "<p>The vault is currently empty. Stay tuned!</p>";
            return;
        }

        // 4. Map through your items and clear out the "Loading..." text
        container.innerHTML = items.map(item => `
            <article class="writing-card">
                <h2>${item.title}</h2>
                <span class="type-tag">${item.type || 'Poem'}</span>
                <p class="content-body" style="white-space: pre-wrap;">${item.content}</p>
            </article>
        `).join('');

    } catch (error) {
        console.error('Database connection failed:', error.message);
        container.innerHTML = `<p style="color: #ff6b6b;">Failed to load writing. Please try refreshing.</p>`;
    }
}

// 5. Fire off the function the moment the page opens
window.addEventListener('DOMContentLoaded', loadContent);