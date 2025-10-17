import Image from "next/image"
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share } from "lucide-react"
import { BsTwitterX } from "react-icons/bs";

interface Tweet {
  id: number
  username: string
  handle: string
  time: string
  content: string
  stats: {
    comments: number
    retweets: number
    likes: number
    views: number
  }
}

const parseContent = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const mentionRegex = /(@\w+)/g
  const hashtagRegex = /(#\w+)/g

  return text.split('\n').map((paragraph, i) => (
    <p key={i} className="text-[#1d1d1d] mt-2 first:mt-0">
      {paragraph.split(' ').map((word, j) => {
        if (urlRegex.test(word)) {
          return (
            <a key={j} href={word} className="text-[#1d9bf0] hover:underline" target="_blank" rel="noopener noreferrer">
              {word}{' '}
            </a>
          )
        }
        if (mentionRegex.test(word)) {
          return (
            <span key={j} className="text-[#1d9bf0]">
              {word}{' '}
            </span>
          )
        }
        if (hashtagRegex.test(word)) {
          return (
            <span key={j} className="text-[#1d9bf0]">
              {word}{' '}
            </span>
          )
        }
        return <span key={j}>{word} </span>
      })}
    </p>
  ))
}

export default function TwitterInterface() {
  const accountAvatar = "/assets/avatar.png";

  const tweets: Tweet[] = [
    {
      id: 1,
      username: "TheNewsCrypto",
      handle: "@The_NewsCrypto",
      time: "1h",
      content: "Will Ethereum (ETH) Hold the $3K Line or Drop Below? @ethereum #CryptoNews",
      stats: {
        comments: 38,
        retweets: 15,
        likes: 409,
        views: 3600
      }
    },
    {
      id: 2,
      username: "TheNewsCrypto",
      handle: "@The_NewsCrypto",
      time: "1h",
      content: "Hey #crypto enthusiast!\n\nThe global #cryptocurrency market is buzzing as $BTC climbs higher, fueled by excitement around the #Trump victory.\n\nhttps://crypto.market/news",
      stats: {
        comments: 38,
        retweets: 15,
        likes: 409,
        views: 3600
      }
    },
    {
      id: 3,
      username: "TheNewsCrypto",
      handle: "@The_NewsCrypto",
      time: "1h",
      content: "Dogecoin ( $DOGE ), Rexas Finance ( $RXS ), Shiba Inu ( $SHIB ): 3 Tokens Elon will Pump in 2025\n\nTo know more\n\nhttps://thenewscrypto.com/dogecoin-doge-rexas-finance-rxs-shiba-inu-shib-3-tokens-elon-will-pump-in-2025/ #ElonMusk #Crypto",
      stats: {
        comments: 38,
        retweets: 15,
        likes: 409,
        views: 3600
      }
    }
  ]

  return (
    <div className="max-w-lg">
      <div className="bg-white rounded-3xl shadow-lg drop-shadow-[7px_7px_4px_rgba(0,0,0,0.12)] overflow-hidden p-12 relative border-2 border-[#00000047]">
        {/* Twitter Header */}
        <div className="flex items-center justify-center py-4">
          <div className="bg-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <BsTwitterX className="text-white text-lg" />
          </div>
          <span className="text-[#303030] text-xl font-bold">Twitter</span>
        </div>

        {/* Tweet Feed */}
        <div className="relative">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="p-4 pl-0 border-b border-[#e6e6e6] last:border-b-0">
              <div className="flex">
                <div className="mr-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={accountAvatar}
                      alt={`${tweet.username} profile`}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-bold text-[#1d1d1d] mr-1">{tweet.username}</span>
                    <span className="text-[#858585] mr-1">{tweet.handle}</span>
                    <span className="text-[#858585] mr-1">·</span>
                    <span className="text-[#858585] mr-1">{tweet.time}</span>
                    <span className="ml-auto text-[#506B7FBA]">
                      <span className="font-normal text-xs  ">•••</span>
                    </span>
                  </div>
                  <div className="mt-1 text-base">
                    {parseContent(tweet.content)}
                  </div>
                  <div className="flex justify-between mt-3 text-[#858585]">
                    <button className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>{tweet.stats.comments}</span>
                    </button>
                    <button className="flex items-center">
                      <Repeat2 className="w-4 h-4 mr-2" />
                      <span>{tweet.stats.retweets}</span>
                    </button>
                    <button className="flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      <span>{tweet.stats.likes}</span>
                    </button>
                    <button className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      <span>{tweet.stats.views >= 1000 ? `${(tweet.stats.views / 1000).toFixed(1)}k` : tweet.stats.views}</span>
                    </button>
                    <button>
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button>
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Side Profile Tag - Right side of card */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-fit rotate-90 translate-x-16 whitespace-nowrap">
          <div className="bg-[#9ddde1] py-3 px-7 rounded-b-2xl">
            <span className="text-xs font-normal text-[#000000BF]">@The_NewsCrypto</span>
          </div>
        </div>
      </div>
    </div>
  )
}