import React, { Component } from 'react';
import { Layout } from 'antd';
import { Menu, Dropdown, Icon, message } from 'antd';
import styles from './Header.module.css';
const { Header } = Layout;

class header extends Component {
	render() {
		const changeLanguageHandeler = ({ key }) => {
			message.info(`Click on item ${key}`);
		};

		const menu = (
			<Menu onClick={changeLanguageHandeler}>
				<Menu.Item key='DE'>
					<a rel='noopener noreferrer' href='#DEUTSCH'>
						DEUTSCH (DE)
					</a>
				</Menu.Item>
				<Menu.Item key='EN'>
					<a rel='noopener noreferrer' href='#ENGLISH'>
						ENGLISH (EN)
					</a>
				</Menu.Item>
				<Menu.Item key='IT'>
					<a rel='noopener noreferrer' href='#ITALIANO'>
						ITALIANO (IT)
					</a>
				</Menu.Item>
			</Menu>
		);

		return (
			<Header className={styles.header}>
				<div className={styles.headerContent}>
					<h1 className={styles.headerLogo}>
						<a href='#'>
							<img
								src='https://static.talixo.de/images/talixo_logo_2x.png'
								alt='Talixo'
								className={styles.headerLogoImg}
							/>
						</a>
					</h1>
					<ul className={styles.headerMenu}>
						<Dropdown overlay={menu}>
							<div className={styles.headerMenuAnchor}>
								PL <Icon type='down' />
							</div>
						</Dropdown>
					</ul>
				</div>
			</Header>
		);
	}
}

export default header;
