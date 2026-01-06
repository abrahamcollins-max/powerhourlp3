import React from 'react';

export enum ViewState {
  HERO = 'HERO',
  TOURNAMENTS = 'TOURNAMENTS',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  CONTACT = 'CONTACT'
}

export interface Tournament {
  id: string;
  name: string;
  type: 'PPP' | 'GPP'; // Progressive Prize Purse | Guaranteed Prize Purse
  ticker: string;
  traders: number;
  maxTrade: string;
  start: string;
  end: string;
  purse: string;
  cost: string;
}

export interface HexStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}