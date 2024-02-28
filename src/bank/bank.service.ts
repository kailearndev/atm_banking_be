import { Body, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entity/bank.entities';
import { Repository } from 'typeorm';
import { createCardDto } from './dto/create-card.dto';

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);
  constructor(@InjectRepository(Bank) private bankRepository: Repository<Bank>) { }

  getAllTheme() {
    const theme = [
      {
        id: 1,
        name: 'Sky',
        url: 'https://www.pixground.com/wp-content/uploads/2023/…ixel-Art-AI-Generated-4K-Wallpaper-2048x1152.webp'
      },
      {
        id: 2,
        name: 'Garden',
        url: 'https://images6.alphacoders.com/129/1293302.jpg'
      },
      {
        id: 3,
        name: 'Moon',
        url: 'https://e0.pxfuel.com/wallpapers/209/883/desktop-wallpaper-landscape-pixel-art-ipad-air-artist-and-background-cloud-pixel-art.jpg'
      }
    ]
    return { theme }
  }

  async createCard(dto: createCardDto) {
    const cardExisted = await this.bankRepository.findOne({
      where: {
        cardNumber: dto.cardNumber
      }
    })
    if (cardExisted) {
      throw new NotFoundException('CardNumber is Existed')

    } else {
      const card = this.bankRepository.create(dto)
      return await this.bankRepository.save(card)
    }

  }
   
  async getCard(id: number) {
    const themeActiveLists = [
      {
        id: 1,
        name: 'Sky',
        url: 'https://www.shutterstock.com/image-vector/enchanting-anime-landscape-mistcovered-mountain-600nw-2301778699.jpg'
      },
      {
        id: 2,
        name: 'Garden',
        url: 'https://images6.alphacoders.com/129/1293302.jpg'
      },
      {
        id: 3,
        name: 'Moon',
        url: 'https://e0.pxfuel.com/wallpapers/209/883/desktop-wallpaper-landscape-pixel-art-ipad-air-artist-and-background-cloud-pixel-art.jpg'
      }
    ]
    const card = await this.bankRepository.findOne({
      where: {
        id: id
      }
      ,
      relations:
      {
        transactions: true
      }

    },

    )
    return card ? { ...card, themeActiveLists } : 'card not exist'
  }
  async getAllCard() {
    const card = await this.bankRepository.find({
      relations: ['transaction']
    })

    return card
  }
  async updateCard(id: number, dto: createCardDto) {
    const cardUpdate = await this.bankRepository.findOne({ where: { id: id } })
    const newCard = { ...cardUpdate, ...dto }
    return cardUpdate ? await this.bankRepository.save(newCard) : 'card not exist'
  }
  async updateCardTheme(id: number, dto: createCardDto, theme: string) {
    const cardUpdate = await this.bankRepository.findOne({ where: { id: id } })
    const newCard = {
      ...cardUpdate,
      ...dto,
      theme: theme,
    }
    return cardUpdate ? await this.bankRepository.save(newCard) : 'card not exist'
  }
  async deleteCard(id: number) {
    const card = await this.bankRepository.findOne({ where: { id: id } })
    return card ? await this.bankRepository.remove(card) : 'card not exist'
  }

 
}
