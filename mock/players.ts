import { Response, Request } from 'express'
import { Hero, Player } from '../src/api/types'
import { heros } from './heros'
import faker from 'faker'

faker.locale = 'zh_CN'

// 模拟玩家数据
const playerCount = 100
const playerList: Player[] = []

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    accountname: faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(10000),
    level: faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay: genWanttoplay(),
    winningstreak: faker.random.number(10),
  })
}

function genWanttoplay() {
  let wanttoplay: Set<Hero> = new Set()
  while(wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

// 路由实现--获取玩家信息
export const getPlayers = (req: Request, res: Response) => {
  // 从查询参数中获取分页、过滤关键词等参数
  const { accountname, page = 1, limit = 10 } = req.query
  // 过滤
  let mockList = playerList.filter(item => {
    if (accountname && item.accountname.indexOf(accountname as string) < 0) {
      return false
    }
    return true
  })
  // 分页
  const pageList = mockList.filter((item, index) => index < (limit as number) * (page as number) && index >= (limit as number) * ((page as number) - 1))
  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      players: pageList
    }
  })
}
// 查询玩家信息
export const getPlayer = (req: Request, res: Response) => {
  const { id } = req.params
  for (const player of playerList) {
    if(player.id.toString() === id) {
      res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  // 没有找到数据，报错
  res.json({
    code: 701000,
    message: '没有找到对应的玩家'
  })
}
// 创建玩家
export const createPlayer = (req: Request, res: Response) => {
  // 新增的玩家数据
  const { player } = req.body
  // 直接返回
  res.json({
    code: 20000,
    data: {
      player
    }
  })
}
// 更新玩家
export const updatePlayer = (req: Request, res: Response) => {
  // 新增的英雄数据
  const { id } = req.params
  const { params } = req.body
  for (const player of playerList) {
    if(player.id.toString() === id) {
      res.json({
        code: 20000,
        data: {
          player
        }
      })
    }
  }
  // 直接返回
  res.json({
    code: 70001,
    message: '没有找到响应玩家信息'
  })
}
// 删除玩家
export const deletePlayer = (req: Request, res: Response) => {
  // 直接返回
  res.json({
    code: 20000
  })
}