
module SampleData
  ENGLISH_TEXTS = [
    {
      title: 'サンプルテキスト1',
      body: <<-TEXT
HANS IN LUCK

  Some men are born to good luck: all they do or try to do comes right—all that falls to them is so much gain—all their geese are swans—all their cards are trumps—toss them which way you will, they will always, like poor puss, alight upon their legs, and only move on so much the faster. The world may very likely not always think of them as they think of themselves, but what care they for the world? what can it know about the matter?
  
  One of these lucky beings was neighbour Hans. Seven long years he had worked hard for his master. At last he said, ‘Master, my time is up; I must go home and see my poor mother once more: so pray pay me my wages and let me go.’ And the master said, ‘You have been a faithful and good servant, Hans, so your pay shall be handsome.’ Then he gave him a lump of silver as big as his head.
      
  Hans took out his pocket-handkerchief, put the piece of silver into it, threw it over his shoulder, and jogged off on his road homewards. As he went lazily on, dragging one foot after another, a man came in sight, trotting gaily along on a capital horse. ‘Ah!’ said Hans aloud, ‘what a fine thing it is to ride on horseback! There he sits as easy and happy as if he was at home, in the chair by his fireside; he trips against no stones, saves shoe-leather, and gets on he hardly knows how.’ Hans did not speak so softly but the horseman heard it all, and said, ‘Well, friend, why do you go on foot then?’ ‘Ah!’ said he, ‘I have this load to carry: to be sure it is silver, but it is so heavy that I can’t hold up my head, and you must know it hurts my shoulder sadly.’ ‘What do you say of making an exchange?’ said the horseman.
      TEXT
    },
    {
      title: 'サンプルテキスト2',
      body: <<-TEXT
THE GOLDEN BIRD

  A certain king had a beautiful garden, and in the garden stood a tree which bore golden apples. These apples were always counted, and about the time when they began to grow ripe it was found that every night one of them was gone. The king became very angry at this, and ordered the gardener to keep watch all night under the tree. The gardener set his eldest son to watch; but about twelve o’clock he fell asleep, and in the morning another of the apples was missing. 
  
  Then the second son was ordered to watch; and at midnight he too fell asleep, and in the morning another apple was gone. Then the third son offered to keep watch; but the gardener at first would not let him, for fear some harm should come to him: however, at last he consented, and the young man laid himself under the tree to watch. As the clock struck twelve he heard a rustling noise in the air, and a bird came flying that was of pure gold; and as it was snapping at one of the apples with its beak, the gardener’s son jumped up and shot an arrow at it. But the arrow did the bird no harm; only it dropped a golden feather from its tail, and then flew away. The golden feather was brought to the king in the morning, and all the council was called together. Everyone agreed that it was worth more than all the wealth of the kingdom: but the king said, ‘One feather is of no use to me, I must have the whole bird.’
      TEXT
    },
  ]

  MEMO_WORDS = [
    {
      text_title: 'サンプルテキスト1',
      word: 'all their geese are swans',
      start_position: 124,
      end_position: 148,
    },
    {
      text_title: 'サンプルテキスト1',
      word: 'neighbour',
      start_position: 486,
      end_position: 494,
    },
    {
      text_title: 'サンプルテキスト2',
      word: 'grow ripe',
      start_position: 187,
      end_position: 195,
    },
    {
      text_title: 'サンプルテキスト2',
      word: 'was ordered to watch',
      start_position: 513,
      end_position: 532,
    },
  ]

  MEMOS = [
    {
      text_title: 'サンプルテキスト1',
      word_start_position: 124,
      body: <<-TEXT
geese : goose の複数形 ガチョウ

swan : 白鳥
      TEXT
    },
    {
      text_title: 'サンプルテキスト1',
      word_start_position: 124,
      body: <<-TEXT
直訳：
彼らのガチョウはすべて白鳥です。

意訳：
彼らの持っているものや遭遇する状況は、すべて価値があり、最高の状況です。
      TEXT
    },
    { 
      text_title: 'サンプルテキスト1',
      word_start_position: 486,
      body: <<-TEXT
隣人
      TEXT
    },
    { 
      text_title: 'サンプルテキスト1',
      word_start_position: 486,
      body: <<-TEXT
neighbour：イギリス英語
neighbor  ：アメリカ英語
      TEXT
    },
    { 
      text_title: 'サンプルテキスト2',
      word_start_position: 187,
      body: <<-TEXT
熟してきた

ripe：熟した（状態）
      TEXT
    },
    { 
      text_title: 'サンプルテキスト2',
      word_start_position: 513,
      body: <<-TEXT
見張りを命じられた

be ordered to : 〜を命じられる
      TEXT
    },
  ]
end
