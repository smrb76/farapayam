export type Product = {
  id: string;
  code: string;
  nameFa: string;
  nameEn: string;
  p1: string;
  p2: string;
  p3: string;
};

export type Warehouse = {
  id: string;
  name: string;
  products: Product[];
};

export const WAREHOUSES: Warehouse[] = [
  {
    id: 'w1',
    name: 'انبار شماره ۱',
    products: [
      {
        id: 'w1p1',
        code: '2001-001',
        nameFa: 'آبمیوه آناناس ۲۴۰cc',
        nameEn: 'Pineapple 240cc',
        p1: '۰-۱-۳',
        p2: '۰-۱-۰',
        p3: '۱-۰-۰',
      },
      {
        id: 'w1p2',
        code: '2001-002',
        nameFa: 'آبمیوه انبه ۲۴۰cc',
        nameEn: 'Mango 240cc',
        p1: '۰-۲-۱',
        p2: '۰-۱-۱',
        p3: '۱-۱-۰',
      },
      {
        id: 'w1p3',
        code: '2001-003',
        nameFa: 'آبمیوه سیب ۲۴۰cc',
        nameEn: 'Apple 240cc',
        p1: '۰-۳-۲',
        p2: '۰-۲-۰',
        p3: '۰-۱-۰',
      },
    ],
  },
  {
    id: 'w2',
    name: 'انبار شماره ۲',
    products: [
      {
        id: 'w2p1',
        code: '3001-010',
        nameFa: 'آبمیوه پرتقال ۲۴۰cc',
        nameEn: 'Orange 240cc',
        p1: '۱-۰-۰',
        p2: '۰-۱-۰',
        p3: '۰-۰-۱',
      },
      {
        id: 'w2p2',
        code: '3001-011',
        nameFa: 'آبمیوه انگور ۲۴۰cc',
        nameEn: 'Grape 240cc',
        p1: '۱-۱-۰',
        p2: '۰-۰-۱',
        p3: '۰-۱-۰',
      },
      {
        id: 'w2p3',
        code: '3001-012',
        nameFa: 'آبمیوه لیموناد ۲۴۰cc',
        nameEn: 'Lemonade 240cc',
        p1: '۰-۰-۱',
        p2: '۱-۰-۰',
        p3: '۰-۱-۱',
      },
    ],
  },
  {
    id: 'w3',
    name: 'انبار شماره ۳',
    products: [
      {
        id: 'w3p1',
        code: '4001-100',
        nameFa: 'آبمیوه کیوی ۲۴۰cc',
        nameEn: 'Kiwi 240cc',
        p1: '۲-۰-۰',
        p2: '۰-۲-۰',
        p3: '۰-۰-۲',
      },
      {
        id: 'w3p2',
        code: '4001-101',
        nameFa: 'آبمیوه مخلوط ۲۴۰cc',
        nameEn: 'Mixed 240cc',
        p1: '۲-۱-۰',
        p2: '۰-۱-۲',
        p3: '۱-۰-۱',
      },
      {
        id: 'w3p3',
        code: '4001-102',
        nameFa: 'آبمیوه هلو ۲۴۰cc',
        nameEn: 'Peach 240cc',
        p1: '۱-۲-۰',
        p2: '۲-۰-۱',
        p3: '۰-۱-۰',
      },
    ],
  },
];
