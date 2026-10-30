import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Info, Search, Home, Film, Tv, PlusSquare, Bookmark, User, Menu, X,
  ChevronRight, ChevronLeft, Star, Calendar, Clock, Check, Plus, Trash2,
  Edit, Shield, Youtube, ExternalLink, Settings, Filter, ArrowLeft, Volume2,
  VolumeX, Maximize, RotateCcw, AlertCircle, Send, CheckCircle2, Sparkles,
  SlidersHorizontal, Eye, FileText, Share2
} from 'lucide-react';

// ==========================================
// INITIAL MOCK DATA (PERSISTED IN LOCALSTORAGE)
// ==========================================
const DEFAULT_ANIME_DATA = [
  {
    id: 'anime-1',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    titleSinhala: 'ඩීමන් ස්ලේයර්: කිමෙට්සු නො යායිබා',
    type: 'series',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.9',
    year: '2024',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Fantasy', 'Shounen'],
    synopsis: 'තාන්ජිරෝ ගේ පවුල යක්ෂයෙකු විසින් ඝාතනය කිරීමෙන් පසු, යක්ෂයෙකු බවට පත් වූ සිය නැගණිය නෙසුකෝ නැවත මනුෂ්‍යයෙකු කිරීමට ඔහු දරන අසිරු උත්සාහය සහ යක්ෂයන්ට එරෙහිව කරන සටන මෙහි දැක්වේ.',
    synopsisEnglish: 'Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his younger sister Nezuko is turned into a demon.',
    isFeatured: true,
    isUpcoming: false,
    episodesCount: 26,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1 - Tanjiro Kamado Unwavering Resolve Arc',
        episodes: [
          {
            id: 'ep-1-1',
            number: 1,
            title: 'cruelty (ලෙයින් තෙත් වූ දිනය)',
            duration: '24m',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop'
          },
          {
            id: 'ep-1-2',
            number: 2,
            title: 'Trainer Sakonji Urokodaki (උරොකොඩากි මුහුණුවර)',
            duration: '23m',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'anime-2',
    title: 'Spider-Man: Across the Spider-Verse',
    titleSinhala: 'ස්පයිඩර්-මෑන්: ඇක්‍රොස් ද ස්පයිඩර්-වර්ස්',
    type: 'movie',
    badge: 'සිංහල උපසිරැසි - SINHALA SUB',
    language: 'Sinhala Sub',
    rating: '8.8',
    year: '2023',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Sci-Fi', 'Animation'],
    synopsis: 'මයිල්ස් මොරාලෙස් වෙනත් මල්ටිවර්ස් ලෝක කරා ගමන් කරමින් වෙනත් ස්පයිඩර්-මෑන්වරුන් හමුවී විශ්වයේ පැවැත්ම වෙනුවෙන් සටන් කරයි.',
    synopsisEnglish: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    isFeatured: true,
    isUpcoming: false,
    duration: '2h 20m',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'anime-3',
    title: 'Jujutsu Kaisen Season 2',
    titleSinhala: 'ජුජුට්සු කයිසෙන් - දෙවන කොටස',
    type: 'series',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.6',
    year: '2023',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    synopsis: 'ගෝජෝ සතෝරු සහ ගෙටෝ සුගුරු ගේ අතීත ශිෂ්‍ය සමය සහ ෂිබුයා හදිසි අවස්ථාව පාදක කරගත් සිංහල හඬකැවූ කථාංග මාලාව.',
    synopsisEnglish: 'Explores the past of Satoru Gojo and Suguru Geto during their days at Jujutsu High, and the terrifying Shibuya Incident.',
    isFeatured: true,
    isUpcoming: false,
    episodesCount: 23,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Shibuya Incident Arc',
        episodes: [
          {
            id: 'ep-jk-1',
            number: 1,
            title: 'Hidden Inventory (සඟවුණු ශක්තිය)',
            duration: '24m',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'anime-4',
    title: 'Puss in Boots: The Last Wish',
    titleSinhala: 'පුස් ඉන් බූට්ස්: ද ලාස්ට් විශ්',
    type: 'movie',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.2',
    year: '2022',
    poster: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop',
    genres: ['Animation', 'Comedy', 'Adventure'],
    synopsis: 'තමාගේ ජීවිත නවයෙන් අටක්ම අහිමි වී ඇති බව දැනගන්නා පුස්, ඔහුගේ අන්තිම කැමැත්ත ඉටු කර ගැනීමට මිථ්‍යා තාරකාව සෙවීමේ මහා සංචාරයක් අරඹයි.',
    synopsisEnglish: 'Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives.',
    isFeatured: false,
    isUpcoming: false,
    duration: '1h 42m',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4'
  },
  {
    id: 'anime-5',
    title: 'Ben 10: Alien Force',
    titleSinhala: 'බෙන් 10: ඒලියන් ෆෝස්',
    type: 'series',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.3',
    year: '2008',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    synopsis: 'වයස අවුරුදු 15 දී නැවතත් ඇලියන් තර්ජන හමුවේ ඔම්නිට්‍රික්ස් පළඳින බෙන් සහ ඔහුගේ කණ්ඩායම පෘථිවිය බේරා ගැනීමට සටන් කරයි.',
    synopsisEnglish: 'Five years after his last adventure, 15-year-old Ben Tennyson puts on the Omnitrix once again.',
    isFeatured: false,
    isUpcoming: false,
    episodesCount: 46,
    seasons: [
      {
        seasonNumber: 1,
        title: 'Season 1',
        episodes: [
          {
            id: 'ep-ben-1',
            number: 1,
            title: 'Ben 10 Returns: Part 1',
            duration: '22m',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop'
          }
        ]
      }
    ]
  },
  {
    id: 'anime-6',
    title: 'Swapped - Magic Tales',
    titleSinhala: 'ස්වැප්ඩ් - මැජික් ටේල්ස්',
    type: 'movie',
    badge: 'සිංහල උපසිරැසි - SINHALA SUB',
    language: 'Sinhala Sub',
    rating: '8.9',
    year: '2026',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop',
    genres: ['Animation', 'Fantasy'],
    synopsis: '2026 වසරේ නිකුත් වීමට නියමිත අලුත්ම සිනමා පටය. ඉක්මනින්ම සිංහල හඬකැවීම් සහිතව අපගේ ANIME BOY වෙතින්!',
    synopsisEnglish: 'An upcoming magical animated journey arriving in 2026.',
    isFeatured: false,
    isUpcoming: true,
    duration: 'Coming Soon'
  },
  {
    id: 'anime-7',
    title: 'Hoppers: The Great Forest',
    titleSinhala: 'හොපර්ස්: ද ග්‍රේට් ෆොරස්ට්',
    type: 'movie',
    badge: 'සිංහල උපසිරැසි - SINHALA SUB',
    language: 'Sinhala Sub',
    rating: '8.2',
    year: '2026',
    poster: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1600&auto=format&fit=crop',
    genres: ['Animation', 'Comedy'],
    synopsis: 'ලස්සන වනාන්තරයක සතුන්ගේ අපූර්ව වික්‍රමය. ළඟදීම ANIME BOY යූටියුබ් නාලිකාව හරහා නැරඹිය හැක.',
    synopsisEnglish: 'An adventurous comedy featuring animal kingdom heroes.',
    isFeatured: false,
    isUpcoming: true,
    duration: 'Coming Soon'
  },
  {
    id: 'anime-8',
    title: 'Ben 10: Omniverse',
    titleSinhala: 'බෙන් 10: ඔම්නිවර්ස්',
    type: 'series',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.3',
    year: '2025',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1600&auto=format&fit=crop',
    genres: ['Action', 'Sci-Fi'],
    synopsis: 'නව අභියෝග හා නව පිටසක්වල ජීවීන් සමග බෙන්ගේ අලුත්ම කථාංග මාලාව ළඟදීම.',
    synopsisEnglish: 'Ben Tennyson gets a new partner Rook and new alien forms.',
    isFeatured: false,
    isUpcoming: true,
    episodesCount: 12
  }
];

export default function App() {
  // ------------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------------
  const [animeList, setAnimeList] = useState(() => {
    const saved = localStorage.getItem('animeboy_catalog');
    return saved ? JSON.parse(saved) : DEFAULT_ANIME_DATA;
  });

  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('animeboy_watchlist');
    return saved ? JSON.parse(saved) : ['anime-1', 'anime-3'];
  });

  const [ytConfig, setYtConfig] = useState(() => {
    const saved = localStorage.getItem('animeboy_yt_config');
    return saved ? JSON.parse(saved) : {
      channelName: 'ANIME BOY Official',
      url: 'https://youtube.com',
      subscriberCount: '125K'
    };
  });

  const [currentView, setCurrentView] = useState('home'); // 'home' | 'movies' | 'series' | 'search' | 'request' | 'watchlist' | 'admin' | 'watch'
  const [selectedAnime, setSelectedAnime] = useState(null); // For Modal detail or watch target
  const [watchTarget, setWatchTarget] = useState({ anime: null, episode: null });

  // Mobile Menu & Modals
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('animeboy_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');

  // Toast / Message Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [filterGenre, setFilterGenre] = useState('all');

  // Request Form State
  const [requestTitle, setRequestTitle] = useState('');
  const [requestType, setRequestType] = useState('Movie');
  const [requestNotes, setRequestNotes] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [animeRequests, setAnimeRequests] = useState(() => {
    const saved = localStorage.getItem('animeboy_requests');
    return saved ? JSON.parse(saved) : [
      { id: 'req-1', title: 'Naruto Shippuden Full Sinhala', type: 'Series', notes: 'Please dub all episodes!', date: '2026-03-28' },
      { id: 'req-2', title: 'Attack on Titan Final Season', type: 'Series', notes: 'Sinhala Subbed please', date: '2026-03-29' }
    ];
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('animeboy_catalog', JSON.stringify(animeList));
  }, [animeList]);

  useEffect(() => {
    localStorage.setItem('animeboy_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('animeboy_yt_config', JSON.stringify(ytConfig));
  }, [ytConfig]);

  useEffect(() => {
    localStorage.setItem('animeboy_requests', JSON.stringify(animeRequests));
  }, [animeRequests]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWatchlist = (animeId) => {
    if (watchlist.includes(animeId)) {
      setWatchlist(watchlist.filter(id => id !== animeId));
      showToast('Removed from Watchlist');
    } else {
      setWatchlist([...watchlist, animeId]);
      showToast('Added to Watchlist!');
    }
  };

  const handleOpenWatch = (anime, episode = null) => {
    if (anime.isUpcoming) {
      showToast('මෙම ඇනිමේ පටය ළඟදීම නිකුත් වේ! (Coming Soon)');
      return;
    }

    if (anime.type === 'series') {
      const epToPlay = episode || anime.seasons?.[0]?.episodes?.[0];
      if (!epToPlay) {
        showToast('No playable episode available yet.');
        return;
      }
      setWatchTarget({ anime, episode: epToPlay });
    } else {
      setWatchTarget({ anime, episode: null });
    }
    setCurrentView('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const newUser = { name: 'Anime Fan', email: 'fan@animeboy.lk' };
    setUser(newUser);
    localStorage.setItem('animeboy_user', JSON.stringify(newUser));
    setIsAuthModalOpen(false);
    showToast('ගිණුමට සාර්ථකව පිවිසුණි (Logged In)');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('animeboy_user');
    showToast('Signed Out');
  };

  // Filtered lists for view navigation
  const featuredList = animeList.filter(a => a.isFeatured);
  const recentMovies = animeList.filter(a => a.type === 'movie' && !a.isUpcoming);
  const upcomingMovies = animeList.filter(a => a.type === 'movie' && a.isUpcoming);
  const recentSeries = animeList.filter(a => a.type === 'series' && !a.isUpcoming);
  const upcomingSeries = animeList.filter(a => a.type === 'series' && a.isUpcoming);
  const topRatedAnime = [...animeList].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  return (
    <div className="min-h-screen bg-[#050816] text-gray-100 font-sans selection:bg-emerald-500 selection:text-black pb-24 md:pb-12">
      
      {/* ==========================================
          TOAST NOTIFICATION
      ========================================== */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* ==========================================
          HEADER NAVBAR
      ========================================== */}
      <header className="sticky top-0 z-40 bg-[#050816]/90 backdrop-blur-md border-b border-gray-800/60 px-4 lg:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => { setCurrentView('home'); setSelectedAnime(null); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30 group-hover:scale-105 transition-transform">
              <Film className="w-6 h-6 text-black fill-emerald-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                  ANIME <span className="text-emerald-500">BOY</span>
                </span>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  LK
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium -mt-1">සිංහල ඇනිමේ පාරාදීසය</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => { setCurrentView('home'); setSelectedAnime(null); }}
              className={`hover:text-emerald-400 transition-colors flex items-center gap-2 ${currentView === 'home' ? 'text-emerald-500 font-semibold' : 'text-gray-300'}`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button
              onClick={() => { setCurrentView('movies'); setSelectedAnime(null); }}
              className={`hover:text-emerald-400 transition-colors flex items-center gap-2 ${currentView === 'movies' ? 'text-emerald-500 font-semibold' : 'text-gray-300'}`}
            >
              <Film className="w-4 h-4" /> Movies
            </button>
            <button
              onClick={() => { setCurrentView('series'); setSelectedAnime(null); }}
              className={`hover:text-emerald-400 transition-colors flex items-center gap-2 ${currentView === 'series' ? 'text-emerald-500 font-semibold' : 'text-gray-300'}`}
            >
              <Tv className="w-4 h-4" /> TV Series
            </button>
            <button
              onClick={() => { setCurrentView('request'); setSelectedAnime(null); }}
              className={`hover:text-emerald-400 transition-colors flex items-center gap-2 ${currentView === 'request' ? 'text-emerald-500 font-semibold' : 'text-gray-300'}`}
            >
              <PlusSquare className="w-4 h-4" /> Request
            </button>
            <button
              onClick={() => { setCurrentView('watchlist'); setSelectedAnime(null); }}
              className={`hover:text-emerald-400 transition-colors flex items-center gap-2 ${currentView === 'watchlist' ? 'text-emerald-500 font-semibold' : 'text-gray-300'}`}
            >
              <Bookmark className="w-4 h-4" /> Watchlist ({watchlist.length})
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Button */}
            <button
              onClick={() => setCurrentView('search')}
              className="hidden md:flex items-center gap-2 bg-[#101827] hover:bg-gray-800 border border-gray-700/60 px-3.5 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white transition-all"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search anime...</span>
            </button>

            {/* YouTube CTA Banner Link */}
            <a
              href={ytConfig.url}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            >
              <Youtube className="w-4 h-4 text-red-500 fill-current" />
              <span>Subscribe ({ytConfig.subscriberCount})</span>
            </a>

            {/* Admin Panel Toggle */}
            <button
              onClick={() => setCurrentView('admin')}
              title="Admin Dashboard"
              className="p-2 bg-[#101827] hover:bg-emerald-950/40 border border-gray-800 hover:border-emerald-500/50 rounded-lg text-gray-300 hover:text-emerald-400 transition-all"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('watchlist')}
                  className="w-8 h-8 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs"
                >
                  {user.name.charAt(0)}
                </button>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-400 hover:text-red-400 underline hidden sm:inline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs sm:text-sm px-4 py-1.5 rounded-lg transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-emerald-400 rounded-lg focus:outline-none"
            >
              {isMobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE DRAWER NAV PANEL
      ========================================== */}
      {isMobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6 animate-in slide-in-from-top duration-200">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Film className="w-5 h-5 text-black" />
                </div>
                <span className="font-bold text-lg text-white">ANIME <span className="text-emerald-500">BOY</span></span>
              </div>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="p-2 text-gray-400">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 mt-6">
              <button
                onClick={() => { setCurrentView('home'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-emerald-400 p-2 rounded-lg"
              >
                <Home className="w-5 h-5 text-emerald-500" /> Home
              </button>
              <button
                onClick={() => { setCurrentView('movies'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-emerald-400 p-2 rounded-lg"
              >
                <Film className="w-5 h-5 text-emerald-500" /> Anime Movies
              </button>
              <button
                onClick={() => { setCurrentView('series'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-emerald-400 p-2 rounded-lg"
              >
                <Tv className="w-5 h-5 text-emerald-500" /> Anime Series
              </button>
              <button
                onClick={() => { setCurrentView('request'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-emerald-400 p-2 rounded-lg"
              >
                <PlusSquare className="w-5 h-5 text-emerald-500" /> Request Anime
              </button>
              <button
                onClick={() => { setCurrentView('watchlist'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-gray-200 hover:text-emerald-400 p-2 rounded-lg"
              >
                <Bookmark className="w-5 h-5 text-emerald-500" /> My Watchlist ({watchlist.length})
              </button>
              <button
                onClick={() => { setCurrentView('admin'); setIsMobileDrawerOpen(false); }}
                className="flex items-center gap-3 text-lg font-medium text-emerald-400 p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30"
              >
                <Shield className="w-5 h-5" /> Admin Dashboard
              </button>
            </nav>
          </div>

          <div className="border-t border-gray-800 pt-6">
            <a
              href={ytConfig.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 rounded-xl w-full"
            >
              <Youtube className="w-5 h-5 fill-current" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN CONTENT ROUTER
      ========================================== */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4">

        {/* --------------------------------------
            VIEW 1: HOMEPAGE
        -------------------------------------- */}
        {currentView === 'home' && (
          <div className="space-y-10">
            {/* HERO CAROUSEL */}
            <HeroCarousel 
              items={featuredList} 
              onSelect={(anime) => setSelectedAnime(anime)}
              onWatch={handleOpenWatch}
            />

            {/* SECTION 1: Recently Added Movies */}
            <PosterRow
              title="Recently Added Anime Movies"
              icon={<Film className="w-5 h-5 text-emerald-500" />}
              items={recentMovies}
              onSelectAnime={(anime) => setSelectedAnime(anime)}
              onWatchAnime={handleOpenWatch}
              onViewAll={() => setCurrentView('movies')}
            />

            {/* SECTION 2: Coming Soon Movies */}
            <PosterRow
              title="Coming Soon Anime Movies"
              badgeText="UPCOMING"
              icon={<Calendar className="w-5 h-5 text-amber-500" />}
              items={upcomingMovies}
              onSelectAnime={(anime) => setSelectedAnime(anime)}
              onWatchAnime={handleOpenWatch}
              onViewAll={() => setCurrentView('movies')}
            />

            {/* SECTION 3: Recently Added TV Series */}
            <PosterRow
              title="Recently Added TV Series"
              icon={<Tv className="w-5 h-5 text-emerald-500" />}
              items={recentSeries}
              onSelectAnime={(anime) => setSelectedAnime(anime)}
              onWatchAnime={handleOpenWatch}
              onViewAll={() => setCurrentView('series')}
            />

            {/* SECTION 4: Coming Soon TV Series */}
            <PosterRow
              title="Coming Soon TV Series"
              badgeText="UPCOMING"
              icon={<Calendar className="w-5 h-5 text-amber-500" />}
              items={upcomingSeries}
              onSelectAnime={(anime) => setSelectedAnime(anime)}
              onViewAll={() => setCurrentView('series')}
            />

            {/* SECTION 5: Top Rated Anime */}
            <PosterRow
              title="Top Rated Anime"
              icon={<Star className="w-5 h-5 text-amber-400 fill-amber-400" />}
              items={topRatedAnime}
              onSelectAnime={(anime) => setSelectedAnime(anime)}
              onWatchAnime={handleOpenWatch}
              onViewAll={() => setCurrentView('search')}
            />
          </div>
        )}

        {/* --------------------------------------
            VIEW 2: MOVIES CATEGORY PAGE
        -------------------------------------- */}
        {currentView === 'movies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Film className="w-7 h-7 text-emerald-500" />
                  Anime Movies (සිංහල ඇනිමේ චිත්‍රපට)
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">High quality Sinhala Dubbed & Subtitled movies</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                {animeList.filter(a => a.type === 'movie').length} Movies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {animeList.filter(a => a.type === 'movie').map(anime => (
                <PosterCard
                  key={anime.id}
                  anime={anime}
                  onSelect={() => setSelectedAnime(anime)}
                  onWatch={() => handleOpenWatch(anime)}
                />
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW 3: SERIES CATEGORY PAGE
        -------------------------------------- */}
        {currentView === 'series' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Tv className="w-7 h-7 text-emerald-500" />
                  Anime TV Series (කථාංග මාලා)
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">Complete Sinhala dubbed series and episode lists</p>
              </div>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                {animeList.filter(a => a.type === 'series').length} Series
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {animeList.filter(a => a.type === 'series').map(anime => (
                <PosterCard
                  key={anime.id}
                  anime={anime}
                  onSelect={() => setSelectedAnime(anime)}
                  onWatch={() => handleOpenWatch(anime)}
                />
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW 4: SEARCH & FILTER PAGE
        -------------------------------------- */}
        {currentView === 'search' && (
          <div className="space-y-6">
            <div className="bg-[#101827] border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl">
              <div className="relative mb-4">
                <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title or Sinhala name... (උදා: බෙන් 10, Spider-Man)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#050816] text-white pl-12 pr-4 py-3 rounded-xl border border-gray-700/60 focus:border-emerald-500 focus:outline-none transition-all text-sm"
                />
              </div>

              {/* Filters grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-gray-400 block mb-1">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-[#050816] border border-gray-700 rounded-lg p-2 text-gray-200"
                  >
                    <option value="all">All Types</option>
                    <option value="movie">Movies Only</option>
                    <option value="series">Series Only</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Language Badge</label>
                  <select
                    value={filterLanguage}
                    onChange={(e) => setFilterLanguage(e.target.value)}
                    className="w-full bg-[#050816] border border-gray-700 rounded-lg p-2 text-gray-200"
                  >
                    <option value="all">All Languages</option>
                    <option value="Sinhala Dubbed">Sinhala Dubbed</option>
                    <option value="Sinhala Sub">Sinhala Subbed</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Genre</label>
                  <select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="w-full bg-[#050816] border border-gray-700 rounded-lg p-2 text-gray-200"
                  >
                    <option value="all">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Animation">Animation</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Results */}
            {(() => {
              const filtered = animeList.filter(anime => {
                const matchQuery = anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  anime.titleSinhala.toLowerCase().includes(searchQuery.toLowerCase());
                const matchType = filterType === 'all' || anime.type === filterType;
                const matchLang = filterLanguage === 'all' || anime.language === filterLanguage;
                const matchGenre = filterGenre === 'all' || anime.genres.includes(filterGenre);
                return matchQuery && matchType && matchLang && matchGenre;
              });

              return (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-white">
                      Search Results ({filtered.length})
                    </h2>
                  </div>

                  {filtered.length === 0 ? (
                    <div className="text-center py-16 bg-[#101827] rounded-2xl border border-gray-800">
                      <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-300 font-medium">කිසිදු ඇනිමේ පටයක් හමු නොවීය</p>
                      <p className="text-xs text-gray-500 mt-1">Try searching with another keyword or resetting filters</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                      {filtered.map(anime => (
                        <PosterCard
                          key={anime.id}
                          anime={anime}
                          onSelect={() => setSelectedAnime(anime)}
                          onWatch={() => handleOpenWatch(anime)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* --------------------------------------
            VIEW 5: REQUEST ANIME FORM
        -------------------------------------- */}
        {currentView === 'request' && (
          <div className="max-w-2xl mx-auto py-6">
            <div className="bg-[#101827] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <PlusSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">Request Your Favorite Anime</h1>
                  <p className="text-xs text-gray-400">ඔබට අවශ්‍ය ඇනිමේ පටය සිංහලෙන් ඉල්ලුම් කරන්න</p>
                </div>
              </div>

              {requestSuccess ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">ස්තූතියි! ඉල්ලීම සාර්ථකයි</h3>
                  <p className="text-xs text-gray-300">
                    We have received your request for <span className="text-emerald-400 font-semibold">{requestTitle}</span>. Our team will endeavor to add Sinhala dub/sub soon!
                  </p>
                  <button
                    onClick={() => { setRequestSuccess(false); setRequestTitle(''); setRequestNotes(''); }}
                    className="mt-4 bg-emerald-500 text-black font-bold text-xs px-5 py-2 rounded-lg"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if(!requestTitle.trim()) return;
                    const newReq = {
                      id: `req-${Date.now()}`,
                      title: requestTitle,
                      type: requestType,
                      notes: requestNotes,
                      date: new Date().toISOString().split('T')[0]
                    };
                    setAnimeRequests([newReq, ...animeRequests]);
                    setRequestSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Anime Title (ඇනිමේ නම) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Solo Leveling, Bleach..."
                      value={requestTitle}
                      onChange={(e) => setRequestTitle(e.target.value)}
                      className="w-full bg-[#050816] border border-gray-700/70 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Category (වර්ගය)</label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value)}
                      className="w-full bg-[#050816] border border-gray-700/70 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    >
                      <option value="Movie">Anime Movie</option>
                      <option value="Series">TV Series</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-1">Additional Notes / Voice Preference (සටහන්)</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. Prefer Sinhala Dubbed over Subbed..."
                      value={requestNotes}
                      onChange={(e) => setRequestNotes(e.target.value)}
                      className="w-full bg-[#050816] border border-gray-700/70 rounded-xl p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Anime Request (ඉල්ලීම යවන්න)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW 6: WATCHLIST PAGE
        -------------------------------------- */}
        {currentView === 'watchlist' && (
          <div className="space-y-6">
            <div className="border-b border-gray-800 pb-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                  <Bookmark className="w-7 h-7 text-emerald-500" />
                  My Watchlist (මගේ ලැයිස්තුව)
                </h1>
                <p className="text-xs text-gray-400 mt-1">Saved anime movies and series for quick access</p>
              </div>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                {watchlist.length} Saved
              </span>
            </div>

            {watchlist.length === 0 ? (
              <div className="text-center py-20 bg-[#101827] rounded-2xl border border-gray-800 space-y-3">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto" />
                <p className="text-gray-300 font-semibold">ඔබගේ වොච්ලිස්ට් එක හිස්ව පවතී</p>
                <p className="text-xs text-gray-500">Click the bookmark icon on any anime poster to save it here.</p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="mt-2 bg-emerald-500 text-black font-bold text-xs px-5 py-2 rounded-lg"
                >
                  Browse Anime
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {animeList.filter(a => watchlist.includes(a.id)).map(anime => (
                  <PosterCard
                    key={anime.id}
                    anime={anime}
                    onSelect={() => setSelectedAnime(anime)}
                    onWatch={() => handleOpenWatch(anime)}
                    isWatchlisted={true}
                    onToggleWatchlist={() => toggleWatchlist(anime.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* --------------------------------------
            VIEW 7: WATCH PAGE VIEW
        -------------------------------------- */}
        {currentView === 'watch' && watchTarget.anime && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Navigation Back Link */}
            <button
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            {/* Video Player Container */}
            <div className="bg-[#101827] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  key={watchTarget.episode?.videoUrl || watchTarget.anime.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={watchTarget.episode?.thumbnail || watchTarget.anime.backdrop}
                >
                  <source 
                    src={watchTarget.episode?.videoUrl || watchTarget.anime.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} 
                    type="video/mp4" 
                  />
                  Your browser does not support video playback.
                </video>
              </div>

              {/* Title & Info below Video */}
              <div className="p-4 sm:p-6 border-b border-gray-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      {watchTarget.anime.badge}
                    </span>
                    <span className="text-xs text-gray-400">★ {watchTarget.anime.rating}</span>
                  </div>
                  <h1 className="text-lg sm:text-2xl font-bold text-white">
                    {watchTarget.anime.title} 
                    {watchTarget.episode && <span className="text-emerald-400 ml-2">- Ep {watchTarget.episode.number}: {watchTarget.episode.title}</span>}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">{watchTarget.anime.titleSinhala}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleWatchlist(watchTarget.anime.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                      watchlist.includes(watchTarget.anime.id)
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{watchlist.includes(watchTarget.anime.id) ? 'Saved' : 'Add Watchlist'}</span>
                  </button>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: watchTarget.anime.title, url: window.location.href });
                      } else {
                        showToast('Link copied to clipboard!');
                      }
                    }}
                    className="p-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl border border-gray-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Episode Selection Grid (if TV Series) */}
              {watchTarget.anime.type === 'series' && watchTarget.anime.seasons && (
                <div className="p-4 sm:p-6 bg-[#080d1a]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Tv className="w-4 h-4 text-emerald-500" />
                    Select Episode (කථාංග තෝරන්න)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {watchTarget.anime.seasons[0]?.episodes?.map(ep => {
                      const isActive = watchTarget.episode?.id === ep.id;
                      return (
                        <button
                          key={ep.id}
                          onClick={() => setWatchTarget({ ...watchTarget, episode: ep })}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            isActive
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                              : 'bg-[#101827] border-gray-800 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <div className="text-[11px] text-emerald-400 font-bold">EPISODE {ep.number}</div>
                          <div className="text-xs font-semibold truncate mt-0.5">{ep.title}</div>
                          <div className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ep.duration}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* YouTube Subscribe Banner below video */}
            <div className="bg-gradient-to-r from-red-950/40 via-[#101827] to-red-950/40 border border-red-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-lg shadow-red-600/30">
                  <Youtube className="w-6 h-6 text-white fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">
                    Subscribe to {ytConfig.channelName}
                  </h4>
                  <p className="text-xs text-gray-300">නව සිංහල ඇනිමේ වීඩියෝ නැරඹීමට දැන්ම අපගේ YouTube නාලිකාව Subscribe කරන්න!</p>
                </div>
              </div>
              <a
                href={ytConfig.url}
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <span>SUBSCRIBE ({ytConfig.subscriberCount})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* --------------------------------------
            VIEW 8: PROTECTED ADMIN DASHBOARD
        -------------------------------------- */}
        {currentView === 'admin' && (
          <div className="space-y-6 max-w-5xl mx-auto py-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white">ANIME BOY Admin Dashboard</h1>
                  <p className="text-xs text-gray-400">Manage catalog content, YouTube links, and requests</p>
                </div>
              </div>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="text-xs bg-red-950/60 border border-red-500/30 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-900/60"
                >
                  Lock Panel
                </button>
              )}
            </div>

            {!isAdminLoggedIn ? (
              /* Admin Password Verification Block */
              <div className="bg-[#101827] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md mx-auto text-center space-y-4">
                <Shield className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">Enter Admin Password</h3>
                <p className="text-xs text-gray-400">Password default for demo: <span className="text-emerald-400 font-mono">admin123</span></p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminPasswordInput === 'admin123') {
                      setIsAdminLoggedIn(true);
                      showToast('Admin Access Granted');
                    } else {
                      showToast('Invalid Admin Password');
                    }
                  }}
                  className="space-y-3"
                >
                  <input
                    type="password"
                    placeholder="Enter admin password..."
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full bg-[#050816] border border-gray-700 rounded-xl p-3 text-center text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-xl text-sm"
                  >
                    Unlock Dashboard
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Admin Management Tabs */
              <AdminPanelContent 
                animeList={animeList} 
                setAnimeList={setAnimeList}
                ytConfig={ytConfig}
                setYtConfig={setYtConfig}
                animeRequests={animeRequests}
                setAnimeRequests={setAnimeRequests}
                showToast={showToast}
              />
            )}
          </div>
        )}

      </main>

      {/* ==========================================
          DETAIL / INFO MODAL
      ========================================== */}
      {selectedAnime && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#101827] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl my-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedAnime(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-emerald-500 hover:text-black flex items-center justify-center transition-all border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Backdrop Header */}
            <div className="relative h-48 sm:h-64 w-full">
              <img
                src={selectedAnime.backdrop}
                alt={selectedAnime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-[#101827]/60 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end gap-4">
                <img
                  src={selectedAnime.poster}
                  alt={selectedAnime.title}
                  className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-xl border-2 border-emerald-500/50 shadow-xl shrink-0"
                />
                <div className="space-y-1">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    {selectedAnime.badge}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                    {selectedAnime.title}
                  </h2>
                  <p className="text-xs text-gray-300">{selectedAnime.titleSinhala}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-4 text-gray-300 border-b border-gray-800 pb-4">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedAnime.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>{selectedAnime.year}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedAnime.genres.map(g => (
                    <span key={g} className="bg-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-bold text-emerald-400 mb-1">විස්තරය (SYNOPSIS)</h4>
                <p className="text-gray-200 leading-relaxed text-xs sm:text-sm">{selectedAnime.synopsis}</p>
                <p className="text-gray-400 text-xs mt-2 italic">{selectedAnime.synopsisEnglish}</p>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-2">
                {!selectedAnime.isUpcoming ? (
                  <button
                    onClick={() => {
                      const target = selectedAnime;
                      setSelectedAnime(null);
                      handleOpenWatch(target);
                    }}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Watch Now (නරඹන්න)</span>
                  </button>
                ) : (
                  <div className="flex-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold py-3 rounded-xl text-center text-xs">
                    COMING SOON (ළඟදීම)
                  </div>
                )}

                <button
                  onClick={() => toggleWatchlist(selectedAnime.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    watchlist.includes(selectedAnime.id)
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-700'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SIGN IN / REGISTER MODAL
      ========================================== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-[#101827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Sign In to ANIME BOY</h3>
              <p className="text-xs text-gray-400">Save your watch history & favorite lists</p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="user@example.com"
                  className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-emerald-500/20"
              >
                Sign In / Register
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          FIXED MOBILE BOTTOM NAVIGATION BAR
      ========================================== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#050816]/95 backdrop-blur-lg border-t border-gray-800/80 px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => { setCurrentView('home'); setSelectedAnime(null); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
            currentView === 'home' ? 'text-emerald-500 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {currentView === 'home' && <span className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => { setCurrentView('movies'); setSelectedAnime(null); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
            currentView === 'movies' ? 'text-emerald-500 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {currentView === 'movies' && <span className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
          <Film className="w-5 h-5" />
          <span className="text-[10px]">Movies</span>
        </button>

        <button
          onClick={() => { setCurrentView('request'); setSelectedAnime(null); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
            currentView === 'request' ? 'text-emerald-500 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {currentView === 'request' && <span className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
          <PlusSquare className="w-5 h-5" />
          <span className="text-[10px]">Request</span>
        </button>

        <button
          onClick={() => { setCurrentView('series'); setSelectedAnime(null); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
            currentView === 'series' ? 'text-emerald-500 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {currentView === 'series' && <span className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
          <Tv className="w-5 h-5" />
          <span className="text-[10px]">TV Series</span>
        </button>

        <button
          onClick={() => { setCurrentView('search'); setSelectedAnime(null); }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${
            currentView === 'search' ? 'text-emerald-500 font-bold' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          {currentView === 'search' && <span className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Search</span>
        </button>
      </div>

    </div>
  );
}

// ==========================================
// SUB-COMPONENT: HERO FEATURED CAROUSEL
// ==========================================
function HeroCarousel({ items, onSelect, onWatch }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if(!items.length) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;
  const current = items[activeIndex];

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#101827] border border-gray-800 shadow-2xl">
      {/* Background Poster Artwork */}
      <div className="relative h-[420px] sm:h-[500px] w-full">
        <img
          src={current.backdrop}
          alt={current.title}
          className="w-full h-full object-cover transition-all duration-700 scale-105"
        />
        {/* Dark linear and radial gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-3xl space-y-3 sm:space-y-4">
          
          {/* Badge */}
          <div>
            <span className="bg-emerald-500/20 text-emerald-400 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/40 inline-block shadow-sm">
              • {current.badge}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {current.title}
          </h1>

          {/* Meta line */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-300">
            <span className="flex items-center gap-1 font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {current.rating}
            </span>
            <span>{current.year}</span>
            <div className="flex items-center gap-1">
              {current.genres.map(g => (
                <span key={g} className="bg-gray-800/80 text-gray-300 text-[11px] px-2 py-0.5 rounded">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Sinhala Description Preview */}
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-2xl leading-relaxed">
            {current.synopsis}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onWatch(current)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Watch Now</span>
            </button>
            <button
              onClick={() => onSelect(current)}
              className="bg-[#101827]/80 hover:bg-gray-800 text-gray-200 border border-gray-700/80 px-5 py-3 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: HORIZONTAL POSTER ROW
// ==========================================
function PosterRow({ title, badgeText, icon, items, onSelectAnime, onWatchAnime, onViewAll }) {
  const rowRef = useRef(null);

  if (!items || items.length === 0) return null;

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Row Header */}
      <div className="flex items-center justify-between border-b border-gray-800/80 pb-2">
        <div className="flex items-center gap-2 sm:gap-3">
          {icon}
          <h2 className="text-base sm:text-xl font-extrabold text-white">{title}</h2>
          {badgeText && (
            <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
              {badgeText}
            </span>
          )}
          <span className="text-xs text-gray-500 hidden sm:inline">({items.length} items)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewAll}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium mr-2"
          >
            View All
          </button>
          <button
            onClick={() => scroll('left')}
            className="p-1.5 bg-[#101827] hover:bg-gray-800 text-gray-300 rounded-lg border border-gray-800 hidden sm:block"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 bg-[#101827] hover:bg-gray-800 text-gray-300 rounded-lg border border-gray-800 hidden sm:block"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-auto scrollbar-none py-1 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map(anime => (
          <div key={anime.id} className="w-[150px] sm:w-[190px] shrink-0 snap-start">
            <PosterCard
              anime={anime}
              onSelect={() => onSelectAnime(anime)}
              onWatch={() => onWatchAnime && onWatchAnime(anime)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: POSTER CARD (2:3 RATIO)
// ==========================================
function PosterCard({ anime, onSelect, onWatch, isWatchlisted, onToggleWatchlist }) {
  return (
    <div className="group relative flex flex-col space-y-2 cursor-pointer">
      {/* Poster Image Box */}
      <div
        onClick={onSelect}
        className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-[#101827] border border-gray-800/80 group-hover:border-emerald-500/50 transition-all shadow-md"
      >
        <img
          src={anime.poster}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <span className="bg-black/70 backdrop-blur-md text-[10px] font-extrabold text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
            {anime.type === 'movie' ? 'MOVIE' : 'TV'}
          </span>
          <span className="bg-black/80 backdrop-blur-md text-[10px] font-bold text-amber-400 px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-400/20">
            <Star className="w-3 h-3 fill-amber-400" />
            {anime.rating}
          </span>
        </div>

        {/* Upcoming Overlay Badge */}
        {anime.isUpcoming && (
          <div className="absolute inset-x-0 bottom-0 bg-amber-600/90 text-black font-black text-[10px] tracking-wider text-center py-1 uppercase z-10">
            COMING SOON
          </div>
        )}

        {/* Hover / Active Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          {!anime.isUpcoming && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWatch && onWatch();
              }}
              className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto mb-2 shadow-lg hover:scale-110 transition-transform"
            >
              <Play className="w-5 h-5 fill-black ml-0.5" />
            </button>
          )}
          <p className="text-[10px] text-gray-300 line-clamp-2 text-center">{anime.titleSinhala}</p>
        </div>
      </div>

      {/* Info Below Card */}
      <div className="space-y-0.5" onClick={onSelect}>
        <h3 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
          {anime.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-gray-400">
          <span>{anime.year}</span>
          {anime.type === 'series' && anime.episodesCount && (
            <span>{anime.episodesCount} Ep</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: ADMIN DASHBOARD PANEL
// ==========================================
function AdminPanelContent({ animeList, setAnimeList, ytConfig, setYtConfig, animeRequests, setAnimeRequests, showToast }) {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'add' | 'yt' | 'requests'

  // Form State for Adding / Editing Anime
  const [formData, setFormData] = useState({
    title: '',
    titleSinhala: '',
    type: 'movie',
    badge: 'සිංහල හඬකැවූ - SINHALA DUBBED',
    language: 'Sinhala Dubbed',
    rating: '8.5',
    year: '2026',
    poster: '',
    backdrop: '',
    genres: 'Action, Fantasy',
    synopsis: '',
    synopsisEnglish: '',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isUpcoming: false,
    isFeatured: false
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newAnime = {
      ...formData,
      id: `anime-${Date.now()}`,
      genres: formData.genres.split(',').map(g => g.trim()),
      seasons: formData.type === 'series' ? [
        {
          seasonNumber: 1,
          title: 'Season 1',
          episodes: [
            { id: `ep-${Date.now()}-1`, number: 1, title: 'Episode 1', duration: '24m', videoUrl: formData.videoUrl }
          ]
        }
      ] : []
    };

    setAnimeList([newAnime, ...animeList]);
    showToast('New Anime Added Successfully!');
    setActiveTab('catalog');
  };

  const handleDelete = (id) => {
    setAnimeList(animeList.filter(a => a.id !== id));
    showToast('Item Deleted');
  };

  return (
    <div className="bg-[#101827] border border-gray-800 rounded-2xl p-4 sm:p-6 space-y-6">
      {/* Admin Tabs */}
      <div className="flex border-b border-gray-800 gap-2 overflow-x-auto text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 px-4 font-bold transition-colors ${activeTab === 'catalog' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400'}`}
        >
          Catalog ({animeList.length})
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`pb-3 px-4 font-bold transition-colors ${activeTab === 'add' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400'}`}
        >
          + Add New Anime
        </button>
        <button
          onClick={() => setActiveTab('yt')}
          className={`pb-3 px-4 font-bold transition-colors ${activeTab === 'yt' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400'}`}
        >
          YouTube Links
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 px-4 font-bold transition-colors ${activeTab === 'requests' ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-400'}`}
        >
          User Requests ({animeRequests.length})
        </button>
      </div>

      {/* TAB 1: CATALOG MANAGEMENT */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-400">Current active catalog items:</p>
          <div className="space-y-2">
            {animeList.map(item => (
              <div key={item.id} className="bg-[#050816] border border-gray-800 rounded-xl p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={item.poster} alt={item.title} className="w-10 h-14 object-cover rounded-lg" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.type.toUpperCase()} • ★ {item.rating} • {item.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ADD NEW ANIME */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 block mb-1">English Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Sinhala Title</label>
              <input
                type="text"
                required
                value={formData.titleSinhala}
                onChange={(e) => setFormData({ ...formData, titleSinhala: e.target.value })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-gray-400 block mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              >
                <option value="movie">Movie</option>
                <option value="series">Series</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Rating</label>
              <input
                type="text"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Upcoming?</label>
              <select
                value={formData.isUpcoming ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.value === 'true' })}
                className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
              >
                <option value="false">Released</option>
                <option value="true">Coming Soon</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Poster Image URL</label>
            <input
              type="text"
              required
              placeholder="https://..."
              value={formData.poster}
              onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Backdrop Image URL</label>
            <input
              type="text"
              required
              placeholder="https://..."
              value={formData.backdrop}
              onChange={(e) => setFormData({ ...formData, backdrop: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Video Stream MP4 URL</label>
            <input
              type="text"
              required
              placeholder="https://..."
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="text-gray-400 block mb-1">Sinhala Synopsis</label>
            <textarea
              rows={3}
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl text-sm"
          >
            Publish Anime to App
          </button>
        </form>
      )}

      {/* TAB 3: YOUTUBE CONFIG */}
      {activeTab === 'yt' && (
        <div className="space-y-4 max-w-lg">
          <div>
            <label className="text-gray-400 block text-xs mb-1">YouTube Channel Name</label>
            <input
              type="text"
              value={ytConfig.channelName}
              onChange={(e) => setYtConfig({ ...ytConfig, channelName: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block text-xs mb-1">YouTube Channel URL</label>
            <input
              type="text"
              value={ytConfig.url}
              onChange={(e) => setYtConfig({ ...ytConfig, url: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="text-gray-400 block text-xs mb-1">Subscriber Count Text</label>
            <input
              type="text"
              value={ytConfig.subscriberCount}
              onChange={(e) => setYtConfig({ ...ytConfig, subscriberCount: e.target.value })}
              className="w-full bg-[#050816] border border-gray-700 rounded-xl p-2.5 text-xs text-white"
            />
          </div>
          <button
            onClick={() => showToast('YouTube Settings Saved')}
            className="bg-emerald-500 text-black font-bold text-xs px-5 py-2.5 rounded-xl"
          >
            Save Configuration
          </button>
        </div>
      )}

      {/* TAB 4: USER REQUESTS */}
      {activeTab === 'requests' && (
        <div className="space-y-3">
          {animeRequests.map(req => (
            <div key={req.id} className="bg-[#050816] border border-gray-800 rounded-xl p-3 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-white text-sm">{req.title} ({req.type})</h4>
                <p className="text-gray-400 mt-0.5">{req.notes || 'No extra notes'}</p>
                <span className="text-[10px] text-gray-500">{req.date}</span>
              </div>
              <button
                onClick={() => {
                  setAnimeRequests(animeRequests.filter(r => r.id !== req.id));
                  showToast('Request cleared');
                }}
                className="text-red-400 hover:text-red-300 p-2"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}